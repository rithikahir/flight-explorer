import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="p-4 border-b border-gray-300 flex items-center justify-between bg-white shadow-sm">
      {user ? (
        <>
          <div className="flex items-center space-x-5">
            <span className="text-sm text-gray-700">
              Logged in as <strong>{user.email}</strong> ({role})
            </span>

            {role === "Admin" && (
              <>
                <Link
                  to="/admin"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/manage-users"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Manage Users
                </Link>
              </>
            )}

            {role === "User" && (
              <Link
                to="/"
                className="text-blue-600 hover:underline font-medium"
              >
                User Dashboard
              </Link>
            )}
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="text-blue-600 hover:underline font-medium"
          >
            Signup
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
