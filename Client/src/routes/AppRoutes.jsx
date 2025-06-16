import {
  ProtectedRoute,
  ProtectedRouteAdmin,
} from "../components/ProtectedRoute";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { Routes, Route } from "react-router-dom";
import UserDashboard from "../pages/UserDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import ManageUsers from "../pages/ManageUsers";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* For Protected User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<UserDashboard />} />
      </Route>
      {/* For Protected Admin Routes */}
      <Route element={<ProtectedRouteAdmin />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
