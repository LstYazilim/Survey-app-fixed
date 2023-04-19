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
  role: string;
  decodedToken: string;
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
        password,
      });
      const token = (response.data.token.result);
      console.log(token);
      const decoded: DecodedToken = jwt_decode(token);
    
      const decodedToken :any= JSON.parse(atob(token.split('.')[1]));
      console.log(decodedToken,"decodedToken");
console.log(decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]);
      
      
    const user = {
  email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
  role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],decodedToken: decodedToken
};
      
      setUser(user);
    
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
  };

  const PrivateRoute = ({ element: Component, ...rest }: any) => (
    <Route {...rest} element={(props:any) => (
      user ? <Component {...props} /> : <Navigate to='/' />
    )} />
  );

return (
  <>
   <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Navigate to='/dashboard' /> : <LoginForm onLogin={handleLogin} />} />
          <Route path='/dashboard' element={<PrivateRoute element={() => {
            if (user?.role === 'admin') {
              return <AdminPage/>;
            } else if (user?.role === 'user') {
              return <UserPage/>;
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
