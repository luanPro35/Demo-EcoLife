import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";

// Components
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

// Pages
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ActivityPage from "./pages/ActivityPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import SuggestionsPage from "./pages/SuggestionsPage";
import BadgesPage from "./pages/BadgesPage";
import ChatPage from "./pages/ChatPage";
import SearchPage from "./pages/SearchPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import FileManagementPage from "./pages/FileManagementPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import PaymentPage from "./pages/PaymentPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import AdminPage from "./pages/admin/AdminPage";
import PointsRewardsPage from "./pages/PointsRewardsPage";
import RankingPage from "./pages/RankingPage";
import UserManagementPage from "./pages/admin/UserManagementPage";

// Auth Components
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Utils
import initCanvasAnimation from "./utils/canvasAnimation";

function App() {
  useEffect(() => {
    // Initialize canvas animation
    const cleanupAnimation = initCanvasAnimation();

    // Cleanup on component unmount
    return () => {
      cleanupAnimation();
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen text-lg">
        <Navbar />
        <main className="flex-grow pt-20 pb-12 px-4">
          {" "}
          {/* Increased padding for more space */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route path="/activity" element={<ActivityPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/suggestions" element={<SuggestionsPage />} />
            <Route path="/badges" element={<BadgesPage />} />
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/payment/:orderId" element={<PaymentPage />} />
            <Route path="/change-password" element={<ChangePasswordPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredPermission="manage_users">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredPermission="manage_users">
                  <UserManagementPage />
                </ProtectedRoute>
              }
            />
            <Route path="/file-management" element={<FileManagementPage />} />
            <Route path="/points-rewards" element={<PointsRewardsPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
