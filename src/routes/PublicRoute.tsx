import React, { ReactNode } from 'react';
import { Route, Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  redirectTo: string;
  path: string;
}

const PublicRoute = ({
  children,
  isAuthenticated,
  redirectTo,
  path,
}: PublicRouteProps) => {
  return (
    <Route
      path={path}
      element={isAuthenticated ? <Navigate to={redirectTo} /> : children}
    />
  );
};

export default PublicRoute;
