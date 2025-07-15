import { useEffect, useState } from "react";
import { getPublicQuizzes } from "../services/quizService";
import QuizCard from "../components/QuizCard";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  const [quizzes, setQuizzes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 12;
  const navigate = useNavigate();

  const fetchQuizzes = async (pageNum = 1) => {
    try {
      const res = await getPublicQuizzes(pageNum, limit);
      const data = res?.data;
      setQuizzes(data?.results || []);
      setTotalPages(Math.ceil((data?.total_results || 0) / limit));
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  useEffect(() => {
    fetchQuizzes(page);
  }, [page]);

  const handleCreateQuiz = () => {
    const isLoggedIn = localStorage.getItem("token"); // or use auth context
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/dashboard/create");
    }
  };

  return (
    <div className="mt-16 px-6 py-8 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-3">
          Welcome to AI Agent Quiz!
        </h1>
        <p className="text-lg text-gray-600">
          Practice, Learn & Improve with curated AI-generated quizzes across
          technologies.
        </p>
      </div>

      <div className="text-center bg-indigo-50 p-8 rounded-xl shadow-md mb-10">
        <h3 className="text-xl font-semibold text-indigo-800 mb-2">
          Want to test your skills or build your own quizzes?
        </h3>
        <button
          onClick={handleCreateQuiz}
          className="inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
        >
          Create a Quiz
        </button>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Latest Public Quizzes
          </h2>
          <Link
            to="/quizzes/public"
            className="text-indigo-600 hover:underline text-sm font-medium"
          >
            View All
          </Link>
        </div>

        {quizzes.length === 0 ? (
          <p className="text-gray-500">No quizzes available at the moment.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {quizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))}
            </div>

            <div className="flex justify-center items-center mt-6 gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={`px-3 py-1 rounded ${
                  page === 1
                    ? "bg-gray-300"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                &lt;
              </button>
              <span className="text-gray-700 font-semibold">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={`px-3 py-1 rounded ${
                  page === totalPages
                    ? "bg-gray-300"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                &gt;
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
