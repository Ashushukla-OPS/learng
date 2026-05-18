import React, { useState } from 'react'
import api from '../../api/axios';

const Forgotpassword = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log("jhgvc");
    
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("");

      const res = await api.post("/api/auth/forgetPass", formData);

      setMessage(res.data.message || "Reset password link sent to your email");

      setFormData({
        email: "",
      });
      setLoading(false);

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong. Try again.",
      );
      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Forgot Password</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Enter your email to receive a reset password link
          </p>
        </div>

        {message && (
          <p className="mb-4 text-center text-sm font-medium text-blue-600">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Email
            </label>

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword
