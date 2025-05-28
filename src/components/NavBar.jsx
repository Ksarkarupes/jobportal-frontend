import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div
        className="text-2xl font-bold text-blue-700 cursor-pointer"
        onClick={() =>
          user?.userType === "employer"
            ? navigate("/dashboard")
            : navigate("/jobs")
        }
      >
        Job Portal
      </div>

      <div className="flex items-center gap-4">
        <span className="text-gray-600 hidden md:inline">
          Welcome, {user?.fullName?.split(" ")[0]}
        </span>

        {/* ✅ Conditionally show "Add Job" only for employers */}
        {user?.userType === "employer" && (
          <button
            onClick={() => navigate("/add")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
          >
            Add Job
          </button>
        )}

        <button
          onClick={handleLogout}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-xl transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
