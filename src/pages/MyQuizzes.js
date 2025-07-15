import { useEffect, useState } from "react";
import { getMyQuizzes } from "../services/quizService";
import QuizCard from "../components/QuizCard";
import { useNavigate } from "react-router-dom";

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 12;
  const navigate = useNavigate();

  const fetchMyQuizzes = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await getMyQuizzes(pageNum, limit);
      const data = res?.data;
      setQuizzes(data?.results || []);
      const total = data?.total_results || 0;
      setTotalPages(Math.ceil(total / limit));
    } catch (err) {
      console.error("Failed to load your quizzes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyQuizzes(page);
  }, [page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="p-6 mt-16">
      <button
        onClick={handleBack}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 transition"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold text-indigo-700 mb-4">
        🧑‍💻 Your Created Quizzes
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        </div>
      ) : quizzes.length === 0 ? (
        <p className="text-gray-600">You haven't created any quizzes yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`px-3 py-1 rounded ${
                page === 1
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              &lt; Prev
            </button>
            <span className="text-gray-700 font-semibold">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded ${
                page === totalPages
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Next &gt;
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default MyQuizzes;
