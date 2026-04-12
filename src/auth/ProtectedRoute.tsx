import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 1. If Auth is still checking the Firebase session, show a loader
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-xs tracking-[0.4em] uppercase text-gray-400">
   Authenticating...
        </div>
      </div>
    );
  }

  // 2. If no user is found, redirect to Login
  // We save the 'referrer' (location) so we can send them back after they log in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. If user exists, render the protected page
  return <>{children}</>;
};

export default ProtectedRoute;