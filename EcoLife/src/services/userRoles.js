/**
 * Check if user is admin
 * @param {Object} user - User object from useAuth hook
 * @returns {boolean}
 */
export const isAdmin = (user) => {
  return user && user.role === "admin";
};

/**
 * Check if user is moderator
 * @param {Object} user - User object from useAuth hook
 * @returns {boolean}
 */
export const isModerator = (user) => {
  return user && (user.role === "admin" || user.role === "moderator");
};

/**
 * Check if user has permission
 * @param {Object} user - User object from useAuth hook
 * @param {string} permission - Permission to check
 * @returns {boolean}
 */
export const hasPermission = (user, permission) => {
  if (!user) return false;

  // Admins have all permissions
  if (user.role === "admin") return true;

  // Define permissions for each role
  const permissions = {
    user: ["read_own_profile", "read_public_content"],
    moderator: [
      "read_own_profile",
      "read_public_content",
      "moderate_content",
    ],
    admin: [
      "read_own_profile",
      "read_public_content",
      "moderate_content",
      "manage_users",
      "manage_settings",
    ],
  };

  return permissions[user.role] && permissions[user.role].includes(permission);
};

export default {
  isAdmin,
  isModerator,
  hasPermission,
};