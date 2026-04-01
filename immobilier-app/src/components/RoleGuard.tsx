import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/authentication/auth-context';

type UserRole = 'client' | 'host';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
  requireAuth?: boolean;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles, 
  redirectTo,
  requireAuth = true 
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check role-based access
  if (user && !allowedRoles.includes(user.type)) {
    const getRedirectPath = (userType: UserRole): string => {
      if (redirectTo) return redirectTo;
      
      switch (userType) {
        case 'host':
          return '/host-space';
        case 'client':
          return '/';
        default:
          return '/';
      }
    };

    return <Navigate to={getRedirectPath(user.type)} replace />;
  }

  return <>{children}</>;
};

export default RoleGuard;
