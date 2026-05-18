import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

const EditJournal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topicName: "",
    description: "",
    studyDuration: "",
    difficultyLevel: "",
    moodTag: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const fetchJournal = async () => {
    try {
      setLoading(true);

      const res = await api.put(`/api/journal/update/${id}`, {
  topicName: formData.topicName,
  description: formData.description,
  studyDuration: Number(formData.studyDuration),
  difficultyLevel: formData.difficultyLevel,
  moodTag: formData.moodTag,
});

      const journal = res.data.journal;
    
      setFormData({
        topicName: journal.topicName || "",
        description: journal.description || "",
        studyDuration: journal.studyDuration || "",
        difficultyLevel: journal.difficultyLevel || "",
        moodTag: journal.moodTag || "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch journal");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournal();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateJournal = async (e) => {
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
      setUpdating(true);

      const res = await api.put(`/api/journal/update/${id}`, {
        topicName: formData.topicName,
        description: formData.description,
        studyDuration: Number(formData.studyDuration),
        difficultyLevel: formData.difficultyLevel,
        moodTag: formData.moodTag,
      });

      toast.success(res.data.message || "Journal updated successfully");

      setTimeout(() => {
        navigate(`/journals/${id}`);
      }, 800);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update journal");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-700 font-semibold">Loading journal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Edit Journal</h1>
            <p className="text-slate-500 mt-1">
              Update your learning entry details.
            </p>
          </div>

          <button
            onClick={() => navigate(`/journals/${id}`)}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition"
          >
            Back to Details
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <form onSubmit={handleUpdateJournal} className="space-y-6">
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
                placeholder="Write what you learned..."
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
                disabled={updating}
                className="w-full sm:flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-md disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {updating ? "Updating..." : "Update Journal"}
              </button>

              <button
                type="button"
                onClick={() => navigate(`/journals/${id}`)}
                className="w-full sm:flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditJournal;
