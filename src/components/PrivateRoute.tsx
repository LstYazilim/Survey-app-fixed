import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate,RouteProps  } from 'react-router-dom';
import axios from 'axios';

import  useAuth  from '../hooks/useAuth';

const PrivateRoute = ({ path, roles, component: Component }: { path: string; roles: string[]; component: React.FC<any> }) => {
   
    interface MyRouteProps {
        path: string;
        component: React.ComponentType<any>;
      }
    const  user :any = useAuth();
  
    if (!user) {
      return <Navigate to="/login" />;
    }
  
    if (!roles.includes(user.role)) {
      return <Navigate to="/" />;
    }
  
    return <Route path={path} element={<Component />} />;
  };