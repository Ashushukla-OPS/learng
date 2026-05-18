import React from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-2xl font-extrabold text-slate-900 cursor-pointer"
          >
            LearnLog
          </h1>
          <p className="text-sm text-slate-500">
            Welcome, {user?.userName || "Student"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/journals")}
            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition"
          >
            Journals
          </button>

          <button
            onClick={() => navigate("/journals/add")}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
          >
            Add Journal
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition"
          >
            Profile
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-bold hover:bg-red-200 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
