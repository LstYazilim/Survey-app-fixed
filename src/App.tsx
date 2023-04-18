import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import LoginForm from './pages/LoginForm';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import LogoutButton from './components/LogOutButton';
import jwt_decode from "jwt-decode";
interface User {
  email: string;
  email: string;
  role: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  interface DecodedToken {
    email: string;
    role: string;
  }
  useEffect(() => {
    console.log(user,"userrrr");
  }, [user]);
  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://localhost:44338/api/Auth/login', {
        email,
        email,
        password,
      });
      const token = (response.data.token.result);
      console.log(token);
      const decoded: DecodedToken = jwt_decode(token);
      console.log(decoded);
      
      const { email: responseEmail, role } = decoded;
      setUser({ email: responseEmail, role });
      console.log(user,"user")
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
