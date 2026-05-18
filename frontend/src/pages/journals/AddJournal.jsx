import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

const AddJournal = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topicName: "",
    description: "",
    studyDuration: "",
    difficultyLevel: "",
    moodTag: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddJournal = async (e) => {
    e.preventDefault();

    if (
      !formData.topicName ||
      !formData.description ||
      !formData.studyDuration ||
      !formData.difficultyLevel ||
      !formData.moodTag
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/api/journal/add", {
        topicName: formData.topicName,
        description: formData.description,
        studyDuration: Number(formData.studyDuration),
        difficultyLevel: formData.difficultyLevel,
        moodTag: formData.moodTag,
      });

      toast.success(res.data.message || "Journal added successfully");

      setFormData({
        topicName: "",
        description: "",
        studyDuration: "",
        difficultyLevel: "",
        moodTag: "",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add journal. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Add Journal</h1>
            <p className="text-slate-500 mt-1">
              Record what you learned today and track your progress.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <form onSubmit={handleAddJournal} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Topic Name
              </label>
              <input
                type="text"
                name="topicName"
                value={formData.topicName}
                onChange={handleChange}
                placeholder="Example: React Router"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Write what you learned today..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none resize-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Study Duration
              </label>
              <input
                type="number"
                name="studyDuration"
                value={formData.studyDuration}
                onChange={handleChange}
                placeholder="Example: 2"
                step="0.5"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
              <p className="text-xs text-slate-500 mt-2">
                Enter duration in hours, like 1, 1.5, 2.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  name="difficultyLevel"
                  value={formData.difficultyLevel}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Select difficulty</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mood
                </label>
                <select
                  name="moodTag"
                  value={formData.moodTag}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">Select mood</option>
                  <option value="happy">Happy</option>
                  <option value="neutral">Neutral</option>
                  <option value="tired">Tired</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {loading ? "Adding Journal..." : "Add Journal"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="w-full sm:flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5">
          <h3 className="font-bold text-blue-800">Tip</h3>
          <p className="text-sm text-blue-700 mt-1">
            Keep your journal short but clear. Mention what you learned, what
            was difficult, and how long you studied.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddJournal;
