import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccount";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import UploadDataset from "./pages/admin/UploadDataset";
import ViewAllDataset from "./pages/admin/ViewAllDataset";
import ViewAnalyzeDataset from "./pages/admin/ViewAnalyzeDataset";
import ViewOpinions from "./pages/admin/ViewOpinions";
import ViewPositive from "./pages/admin/ViewPositive";
import ViewNegative from "./pages/admin/ViewNegative";
import ViewRecommendationsAdmin from "./pages/admin/ViewRecommendations";

/* FETCH (ADMIN ONLY) */
import FetchUpload from "./pages/admin/fetch/FetchUpload";
import FetchPositive from "./pages/admin/fetch/FetchPositive";
import FetchNegative from "./pages/admin/fetch/FetchNegative";
import FetchAll from "./pages/admin/fetch/FetchAll";
import FetchGraph from "./pages/admin/fetch/FetchGraph";

/* USER */
import UserDashboard from "./pages/user/UserDashboard";
import ViewAllDetails from "./pages/user/ViewAllDetails";
import GiveOpinion from "./pages/user/GiveOpinion";
import ViewFeedback from "./pages/user/ViewFeedback";
import ViewRecommendationsUser from "./pages/user/ViewRecommendations";

/* 🔐 ADMIN PROTECT */
const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  if (role !== "admin") return <Navigate to="/" />;
  return children;
};

/* 🔐 USER PROTECT */
const UserRoute = ({ children }) => {
  const role = localStorage.getItem("role");
  if (role !== "user") return <Navigate to="/" />;
  return children;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<CreateAccount />} />

        {/* ================= ADMIN ================= */}
        <Route path="/admin/dashboard" element={<AdminRoute><Layout><AdminDashboard /></Layout></AdminRoute>} />
        <Route path="/admin/upload" element={<AdminRoute><Layout><UploadDataset /></Layout></AdminRoute>} />
        <Route path="/admin/datasets" element={<AdminRoute><Layout><ViewAllDataset /></Layout></AdminRoute>} />
        <Route path="/admin/analyze" element={<AdminRoute><Layout><ViewAnalyzeDataset /></Layout></AdminRoute>} />
        <Route path="/admin/opinions" element={<AdminRoute><Layout><ViewOpinions /></Layout></AdminRoute>} />
        <Route path="/admin/positive" element={<AdminRoute><Layout><ViewPositive /></Layout></AdminRoute>} />
        <Route path="/admin/negative" element={<AdminRoute><Layout><ViewNegative /></Layout></AdminRoute>} />
        <Route path="/admin/recommendations" element={<AdminRoute><Layout><ViewRecommendationsAdmin /></Layout></AdminRoute>} />

        {/* FETCH ADMIN ONLY */}
        <Route path="/admin/fetch/upload" element={<AdminRoute><Layout><FetchUpload /></Layout></AdminRoute>} />
        <Route path="/admin/fetch/positive" element={<AdminRoute><Layout><FetchPositive /></Layout></AdminRoute>} />
        <Route path="/admin/fetch/negative" element={<AdminRoute><Layout><FetchNegative /></Layout></AdminRoute>} />
        <Route path="/admin/fetch/all" element={<AdminRoute><Layout><FetchAll /></Layout></AdminRoute>} />
        <Route path="/admin/fetch/graph" element={<AdminRoute><Layout><FetchGraph /></Layout></AdminRoute>} />  

        {/* ================= USER ================= */}
        <Route path="/user/dashboard" element={<UserRoute><Layout><UserDashboard /></Layout></UserRoute>} />
        <Route path="/user/details" element={<UserRoute><Layout><ViewAllDetails /></Layout></UserRoute>} />
        <Route path="/user/opinion" element={<UserRoute><Layout><GiveOpinion /></Layout></UserRoute>} />
        <Route path="/user/feedback" element={<UserRoute><Layout><ViewFeedback /></Layout></UserRoute>} />
        <Route path="/user/recommendations" element={<UserRoute><Layout><ViewRecommendationsUser /></Layout></UserRoute>} />

      </Routes>
    </BrowserRouter>
  );
}
