import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './pages/LoginForm';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LogoutButton from './components/LogOutButton';

interface User {
  username: string;
  role: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      const { username: responseUsername, role } = response.data;
      setUser({ username: responseUsername, role });
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
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Navigate to='/dashboard' /> : <LoginForm onLogin={handleLogin} />} />
        <PrivateRoute path='/dashboard' element={() => {
          if (user?.role === 'admin') {
            return <AdminPage />;
          } else if (user?.role === 'user') {
            return <UserPage />;
          } else {
            return <div>Unknown role</div>;
          }
        }} />
      </Routes>
      {user && <LogoutButton onLogout={handleLogout} />}
    </BrowserRouter>
  );
};

export default App;
