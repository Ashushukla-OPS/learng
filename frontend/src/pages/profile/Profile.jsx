import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/profile/me");

      setProfile(res.data.profile);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch profile");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    try {
      await logout();

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-700 font-semibold">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Profile not found
          </h2>

          <p className="text-slate-500 mt-2">
            Please login again to view your profile.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const firstLetter = profile.userName
    ? profile.userName.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
            <p className="text-slate-500 mt-1">
              View and manage your account details.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Cover */}
          <div className="bg-gradient-to-r from-blue-600 to-slate-900 px-6 py-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="w-24 h-24 rounded-2xl bg-white flex items-center justify-center shadow-md overflow-hidden">
                {profile.profilePhoto ? (
                  <img
                    src={profile.profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-blue-600">
                    {firstLetter}
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-3xl font-bold text-white">
                  {profile.userName}
                </h2>

                <p className="text-blue-100 mt-1">{profile.email}</p>

                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-bold ${
                    profile.isVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {profile.isVerified ? "Verified Account" : "Not Verified"}
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <p className="text-sm text-slate-500 font-medium">Full Name</p>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  {profile.userName || "N/A"}
                </h3>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <p className="text-sm text-slate-500 font-medium">
                  Email Address
                </p>
                <h3 className="text-lg font-bold text-slate-900 mt-2 break-all">
                  {profile.email || "N/A"}
                </h3>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <p className="text-sm text-slate-500 font-medium">User ID</p>
                <h3 className="text-sm font-bold text-slate-900 mt-2 break-all">
                  {profile.id || "N/A"}
                </h3>
              </div>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
                <p className="text-sm text-slate-500 font-medium">
                  Joined Date
                </p>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  {profile.createdAt
                    ? new Date(profile.createdAt).toLocaleDateString()
                    : "N/A"}
                </h3>
              </div>
            </div>

            {/* Bio */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 mb-8">
              <p className="text-sm text-slate-500 font-medium mb-2">Bio</p>
              <p className="text-slate-700 leading-7">
                {profile.bio || "No bio added yet."}
              </p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <button
                onClick={() => navigate("/profile/edit")}
                className="py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-md"
              >
                Edit Profile
              </button>

              <button
                onClick={() => navigate("/profile/change-password")}
                className="py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition shadow-md"
              >
                Change Password
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="py-3 rounded-xl bg-red-100 text-red-700 font-bold hover:bg-red-200 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <h3 className="font-bold text-blue-800">Profile Tip</h3>
          <p className="text-sm text-blue-700 mt-1">
            Keep your profile updated so your learning dashboard stays
            personalized.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
