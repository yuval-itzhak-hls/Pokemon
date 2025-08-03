// pages/utils/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';

type ProtectedRouteProps = {
  isAuthenticated: boolean;
}

export const ProtectedRoute = ({ isAuthenticated }: ProtectedRouteProps) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
