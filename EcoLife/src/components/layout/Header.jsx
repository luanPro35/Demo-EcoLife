import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import NotificationCenter from "../notifications/NotificationCenter";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">EcoLife</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-600">
              {t("home")}
            </Link>
            <Link
              to="/activities"
              className="text-gray-600 hover:text-primary-600"
            >
              {t("activities")}
            </Link>
            <Link
              to="/leaderboard"
              className="text-gray-600 hover:text-primary-600"
            >
              {t("leaderboard")}
            </Link>
            <Link
              to="/suggestions"
              className="text-gray-600 hover:text-primary-600"
            >
              {t("suggestions")}
            </Link>
            <Link to="/chat" className="text-gray-600 hover:text-primary-600">
              {t("chat")}
            </Link>
            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="text-gray-600 hover:text-primary-600"
              >
                {t("admin")}
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() =>
                  changeLanguage(i18n.language === "en" ? "vi" : "en")
                }
                className="flex items-center space-x-2 focus:outline-none"
              >
                <span className="text-gray-700">
                  {i18n.language === "en" ? "EN" : "VI"}
                </span>
              </button>
            </div>
            {user ? (
              <>
                <NotificationCenter />

                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || "User"}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-primary-600 font-medium">
                          {(user.displayName || user.email || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>
                    <span className="text-gray-700 hidden md:block">
                      {user.displayName || user.email.split("@")[0]}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10 hidden group-hover:block">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("profile")}
                    </Link>
                    <Link
                      to="/change-password"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("changePassword")}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t("logout")}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-800"
                >
                  {t("login")}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
                >
                  {t("register")}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
