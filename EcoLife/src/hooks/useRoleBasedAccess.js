import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { hasPermission } from "../services/userRoles";

export const useRoleBasedAccess = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState({
    canRead: false,
    canWrite: false,
    canDelete: false,
    canAdmin: false,
    canModerate: false,
  });

  useEffect(() => {
    if (user) {
      setPermissions({
        canRead: hasPermission(user, "read_public_content"),
        canWrite: hasPermission(user, "write_own_content"),
        canDelete: hasPermission(user, "delete_own_content"),
        canAdmin: hasPermission(user, "manage_users"),
        canModerate: hasPermission(user, "moderate_content"),
      });
    }
  }, [user]);

  return {
    user,
    permissions,
    isAdmin: user?.role === "admin",
    isModerator: user?.role === "moderator" || user?.role === "admin",
    isUser: user?.role === "user",
    hasPermission: (permission) => hasPermission(user, permission),
  };
};

// Hook for checking route access
export const useRouteAccess = (requiredRole) => {
  const { user, loading } = useAuth();
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      switch (requiredRole) {
        case "admin":
          setHasAccess(user.role === "admin");
          break;
        case "moderator":
          setHasAccess(user.role === "admin" || user.role === "moderator");
          break;
        case "user":
          setHasAccess(!!user);
          break;
        default:
          setHasAccess(true);
      }
    }
  }, [user, loading, requiredRole]);

  return { hasAccess, loading };
};
