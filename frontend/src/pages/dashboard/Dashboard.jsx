import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setMessage("");

      const res = await api.get("/api/details/dashboard");

      setDashboard(res.data);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Failed to fetch dashboard data",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);
console.log(dashboard);

  const handleDelete = async (id) => {
     
     const confirmDelete = window.confirm(
       "Are you sure you want to delete this journal?",
     );
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/journal/delete/${id}`);
      fetchDashboard();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete journal");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-700 font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  if (message) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="bg-white p-6 rounded-2xl shadow border border-slate-200">
          <p className="text-red-600 font-semibold">{message}</p>
          <button
            onClick={fetchDashboard}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl font-bold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }
const totalJournals = dashboard?.totaljournals || 0;
const totalStudyHours = dashboard?.totalduration || 0;

const currentStreak = dashboard?.currentStreak || 0;
const longestStreak = dashboard?.longestStreak || 0;

const totalChallengesCompleted = dashboard?.totalchallangecompleted || 0;

const recentJournals = dashboard?.recentJournals || [];

const weeklyEntries = dashboard?.weeklyJournals?.length || 0;
const weeklyStudyHours = dashboard?.weeklyStudyHours || 0;
const weeklyTopics = dashboard?.weeklyTopics || [];
const weeklyReportMessage =
  dashboard?.weeklyReportMessage || "No weekly report available yet.";
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-500 mt-1">
              Track your learning progress and weekly performance
            </p>
          </div>

          <button
            onClick={() => navigate("/profile")}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition shadow-md"
          >
            View Profile
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 font-medium">Total Journals</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {totalJournals}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 font-medium">Study Hours</p>
            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              {totalStudyHours}h
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 font-medium">Current Streak</p>
            <h2 className="text-3xl font-bold text-orange-500 mt-2">
              {currentStreak} day
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 font-medium">Longest Streak</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {longestStreak} day
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <p className="text-sm text-slate-500 font-medium">
              Challenges Completed
            </p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {totalChallengesCompleted}
            </h2>
          </div>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Weekly Report */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Weekly Learning Report
                </h2>
                <p className="text-sm text-slate-500">
                  Your progress summary for this week
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                This Week
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Weekly Entries</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {weeklyEntries}
                </h3>
              </div>

              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-sm text-slate-500">Weekly Study Hours</p>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  {weeklyStudyHours}h
                </h3>
              </div>
            </div>

            <div className="mb-5">
              <p className="text-sm font-semibold text-slate-700 mb-3">
                Topics Studied
              </p>

              <div className="flex flex-wrap gap-2">
                {weeklyTopics.length > 0 ? (
                  weeklyTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 rounded-full bg-slate-100 text-slate-700 text-sm font-medium"
                    >
                      {topic}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">
                    No topics studied this week
                  </p>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-blue-700 font-semibold">
                {weeklyReportMessage}
              </p>
            </div>
          </div>

          {/* Challenge + Badges */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                Daily Challenge
              </h2>

              <p className="text-sm text-slate-500 mb-4">
                Log an entry before 10 PM tonight
              </p>

              <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                <p className="text-green-700 font-bold">Challenge Progress</p>
                <p className="text-sm text-green-600 mt-1">
                  Total completed: {totalChallengesCompleted}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Badges</h2>

              <p className="text-sm text-slate-500 mb-4">
                Achievements earned by consistency
              </p>

              <div className="flex items-center justify-between bg-slate-50 rounded-xl p-4">
                <span className="text-slate-700 font-semibold">
                  Total Badges
                </span>
                <span className="text-2xl font-bold text-slate-900">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Journals */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Recent Journals
              </h2>
              <p className="text-sm text-slate-500">
                Your latest learning entries
              </p>
            </div>

            <button
              onClick={() => navigate("/journals/add")}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
            >
              Add Journal
            </button>
          </div>

          <div className="space-y-4">
            {recentJournals.length > 0 ? (
              recentJournals.map((journal) => (
                <div
                  key={journal._id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border border-slate-200 rounded-xl p-4 hover:bg-slate-50 transition"
                >
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {journal.topicName}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      {new Date(journal.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-slate-700">
                      {journal.studyDuration}h
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        journal.difficultyLevel === "easy"
                          ? "bg-green-100 text-green-700"
                          : journal.difficultyLevel === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {journal.difficultyLevel}
                    </span>

                    <button
                      onClick={() => navigate(`/journals/${journal._id}`)}
                      className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => navigate(`/journals/edit/${journal._id}`)}
                      className="px-3 py-2 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold hover:bg-blue-200 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(journal._id)}
                      className="px-3 py-2 rounded-lg bg-red-100 text-red-700 text-xs font-bold hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500 font-medium">
                  No recent journals found
                </p>

                <button
                  onClick={() => navigate("/journals/add")}
                  className="mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                >
                  Add Your First Journal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          <button
            onClick={() => navigate("/journals")}
            className="bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-bold text-slate-900">All Journals</h3>
            <p className="text-sm text-slate-500 mt-1">
              View, search, update and delete all entries
            </p>
          </button>

          <button
            onClick={() => navigate("/journals/add")}
            className="bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-bold text-slate-900">Add New Journal</h3>
            <p className="text-sm text-slate-500 mt-1">
              Log today&apos;s learning activity
            </p>
          </button>

          <button
            onClick={() => navigate("/profile")}
            className="bg-white border border-slate-200 rounded-2xl p-5 text-left shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-bold text-slate-900">Profile</h3>
            <p className="text-sm text-slate-500 mt-1">
              View and update your account details
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
