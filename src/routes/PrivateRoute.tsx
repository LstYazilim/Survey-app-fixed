import React, { ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  redirectTo: string;
  requiredRole: 'admin' | 'user';
  path: string;
}

const PrivateRoute = ({
  children,
  isAuthenticated,
  redirectTo,
  requiredRole,
  path,
}: PrivateRouteProps) => {
  return (
    <Route
      path={path}
      element={
        !isAuthenticated ? (
          <Navigate
            to={{
              pathname: redirectTo,
            }}
          />
        ) : requiredRole === 'admin' ? (
          <Navigate
            to={{
              pathname: '/admin',
            }}
          />
        ) : (
          children
        )
      }
    />
  );
};

export default PrivateRoute;
