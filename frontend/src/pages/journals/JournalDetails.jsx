import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

const JournalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [journal, setJournal] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSingleJournal = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/api/journal/getsingle/${id}`);

      setJournal(res.data.journal);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch journal details",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this journal?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/journal/delete${id}`);

      toast.success("Journal deleted successfully");

      navigate("/journals");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete journal");
    }
  };

  useEffect(() => {
    fetchSingleJournal();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-700 font-semibold">
          Loading journal details...
        </p>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center">
          <h2 className="text-xl font-bold text-slate-900">
            Journal not found
          </h2>
          <p className="text-slate-500 mt-2">
            This journal entry does not exist or was deleted.
          </p>

          <button
            onClick={() => navigate("/journals")}
            className="mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
          >
            Back to Journals
          </button>
        </div>
      </div>
    );
  }

  const formattedDate = journal.createdAt
    ? new Date(journal.createdAt).toLocaleDateString()
    : "N/A";

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="max-w-4xl mx-auto">
     
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Journal Details
            </h1>
            <p className="text-slate-500 mt-1">
              View your complete learning entry.
            </p>
          </div>

          <button
            onClick={() => navigate("/journals")}
            className="px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition"
          >
            Back to Journals
          </button>
        </div>

       
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                {journal.topicName}
              </h2>

              <p className="text-sm text-slate-500 mt-2">
                Created on {formattedDate}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  journal.difficultyLevel === "easy"
                    ? "bg-green-100 text-green-700"
                    : journal.difficultyLevel === "medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                }`}
              >
                {journal.difficultyLevel}
              </span>

              <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">
                {journal.moodTag}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-sm text-slate-500 font-medium">
                Study Duration
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                {journal.studyDuration}h
              </h3>
            </div>

            <div className="bg-slate-50 rounded-xl p-5">
              <p className="text-sm text-slate-500 font-medium">
                Difficulty Level
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mt-2 capitalize">
                {journal.difficultyLevel}
              </h3>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              Description
            </h3>

            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <p className="text-slate-700 leading-7">{journal.description}</p>
            </div>
          </div>

          {journal.aiTip && (
            <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-5">
              <h3 className="font-bold text-blue-800">AI Tip</h3>
              <p className="text-sm text-blue-700 mt-2">{journal.aiTip}</p>
            </div>
          )}

          
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => navigate(`/journals/edit/${journal._id}`)}
              className="w-full sm:flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition shadow-md"
            >
              Edit Journal
            </button>

            <button
              onClick={handleDelete}
              className="w-full sm:flex-1 py-3 rounded-xl bg-red-100 text-red-700 font-bold hover:bg-red-200 transition"
            >
              Delete Journal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalDetails;
