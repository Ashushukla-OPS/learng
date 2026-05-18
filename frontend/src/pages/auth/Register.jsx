import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.email || !formData.password) {
      setMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/api/auth/register", {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      });

      setMessage(
        res.data.message ||
          "Account created successfully. Please check your email.",
      );

      setFormData({
        userName: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
     setLoading(false);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Registration failed. Try again.",
        
      );
        setLoading(false);

    } 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Create Account</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Start tracking your learning progress today
          </p>
        </div>

        {message && (
          <p className="mb-4 text-center text-sm font-medium text-blue-600">
            {message}
          </p>
        )}

        <form
          onSubmit={handleRegister}
          className="space-y-5"
          autoComplete="off"
        >
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="off"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
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

export default Register;
