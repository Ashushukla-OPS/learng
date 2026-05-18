import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/profile/me");

      const profile = res.data.profile;

      setFormData({
        userName: profile.userName || "",
        email: profile.email || "",
        bio: profile.bio || "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!formData.userName || !formData.email) {
      toast.error("Name and email are required");
      return;
    }

    try {
      setUpdating(true);

      const res = await api.patch("/api/profile/update", {
        userName: formData.userName,
        email: formData.email,
        bio: formData.bio,
      });

      toast.success(res.data.message || "Profile updated successfully");

      setTimeout(() => {
        navigate("/profile");
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-700 font-semibold">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Profile</h1>
            <p className="text-slate-500 mt-1">
              Update your personal information.
            </p>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition"
          >
            Back to Profile
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <form onSubmit={handleUpdateProfile} className="space-y-6">
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
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
              <p className="text-xs text-slate-500 mt-2">
                Email verification is currently skipped in this version.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="5"
                placeholder="Write something about yourself..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none resize-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              ></textarea>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={updating}
                className="w-full sm:flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="w-full sm:flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <h3 className="font-bold text-blue-800">Profile Tip</h3>
          <p className="text-sm text-blue-700 mt-1">
            Keep your name, email, and bio updated for a better personalized
            experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
