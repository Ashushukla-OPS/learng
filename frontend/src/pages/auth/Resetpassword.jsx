import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!formData.password || !formData.confirmPassword) {
      setMessage("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post(`/api/auth/resetPass/${token}`, {
        password: formData.password,
      });

      setMessage(res.data.message || "Password reset successfully");

      setFormData({
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
      setLoading(false)
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Reset password failed. Try again.",
      );
      setLoading(false);

    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Reset Password</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Enter your new password below
          </p>
        </div>

        {message && (
          <p className="mb-4 text-center text-sm font-medium text-blue-600">
            {message}
          </p>
        )}

        <form
          onSubmit={handleResetPassword}
          className="space-y-5"
          autoComplete="off"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Remember your password?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-bold text-blue-600 hover:text-blue-700"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
