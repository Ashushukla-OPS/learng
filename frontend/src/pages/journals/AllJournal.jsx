import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/axios";

const AllJournals = () => {
  const navigate = useNavigate();

  const [journals, setJournals] = useState([]);
  const [search, setSearch] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchJournals = async () => {
    try {
      setLoading(true);

      const res = await api.get("/api/journal/getall");

      setJournals(res.data.journals || [Z]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch journals");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);

      let query = "";

      if (search) {
        query += `search=${search}`;
      }

      if (difficultyLevel) {
        if (query) {
          query += `&difficultyLevel=${difficultyLevel}`;
        } else {
          query += `difficultyLevel=${difficultyLevel}`;
        }
      }

      const res = await api.get(`/api/journal/search?${query}`);

      setJournals(res.data.journals || []);
    } catch (error) {
      setJournals([]);
      toast.error(error.response?.data?.message || "No journals found");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilter = () => {
    setSearch("");
    setDifficultyLevel("");
    fetchJournals();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this journal?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/api/journal/delete/${id}`);

      toast.success("Journal deleted successfully");

      setJournals((prev) => prev.filter((journal) => journal._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete journal");
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-700 font-semibold">Loading journals...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="max-w-7xl mx-auto">
      
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">All Journals</h1>
            <p className="text-slate-500 mt-1">
              View, search, update and delete your learning entries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/journals/add")}
              className="px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
            >
              Add Journal
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic..."
              className="md:col-span-2 w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />

            <select
              value={difficultyLevel}
              onChange={(e) => setDifficultyLevel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
              <option value="">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            <button
              onClick={handleSearch}
              className="w-full px-4 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </div>

       
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Journal Entries
              </h2>
              <p className="text-sm text-slate-500">
                Total entries: {journals.length}
              </p>
            </div>

            <button
              onClick={handleClearFilter}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition"
            >
              Clear Filter
            </button>
          </div>

          <div className="space-y-4">
            {journals.length > 0 ? (
              journals.map((journal) => (
                <div
                  key={journal._id}
                  className="border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {journal.topicName}
                        </h3>

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

                        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                          {journal.moodTag}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 leading-6">
                        {journal.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500">
                        <span className="font-semibold">
                          Duration: {journal.studyDuration}h
                        </span>

                        <span>
                          Date:{" "}
                          {journal.createdAt
                            ? new Date(journal.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => navigate(`/journals/${journal._id}`)}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition"
                      >
                        View
                      </button>

                      <button
                        onClick={() =>
                          navigate(`/journals/edit/${journal._id}`)
                        }
                        className="px-4 py-2 rounded-xl bg-blue-100 text-blue-700 text-sm font-bold hover:bg-blue-200 transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(journal._id)}
                        className="px-4 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-bold hover:bg-red-200 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-bold text-slate-900">
                  No journals found
                </h3>
                <p className="text-slate-500 mt-1">
                  Start by adding your first learning journal.
                </p>

                <button
                  onClick={() => navigate("/journals/add")}
                  className="mt-5 px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                >
                  Add Journal
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllJournals;
