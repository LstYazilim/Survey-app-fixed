import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './pages/LoginForm';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LogoutButton from './components/LogOutButton';

interface User {
  email: string;
  role: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://localhost:44338/api/Auth/login', {
        email,
        password,
      });
      console.log(response);

      const { username: responseUsername, role } = response.data;
      setUser({ email: responseUsername, role });
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const PrivateRoute = ({ element: Component, ...rest }: any) => (
    <Route {...rest} match={(matchProps:any) => (
      user ? <Component {...matchProps} /> : <Navigate to='/' />
    )} />
  );

return (
  <>
 <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Navigate to='/dashboard' /> : <LoginForm onLogin={handleLogin} />} />
          <Route path='/dashboard' element={<PrivateRoute element={() => {
            if (user?.role === 'admin') {
              return <AdminPage />;
            } else if (user?.role === 'user') {
              return <UserPage />;
            } else {
              return <div>Unknown role</div>;
            }
          }} />} />
        </Routes>
      </BrowserRouter>
      {user && <LogoutButton onLogout={handleLogout} />}
  </>
);
      }
export default App;
