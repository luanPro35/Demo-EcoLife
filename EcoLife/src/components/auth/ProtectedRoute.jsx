// import React from "react"; // Removed unused import
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { hasPermission as userHasPermission } from "../../services/userRoles";

const ProtectedRoute = ({ children, requiredPermission }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Check if the user has the required permission
  const isAuthorized = requiredPermission ? userHasPermission(user, requiredPermission) : true;

  if (!isAuthorized) {
    // Redirect to a forbidden page or home if not authorized
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
