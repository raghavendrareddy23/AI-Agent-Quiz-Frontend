import { useEffect, useState } from "react";
import { getPublicQuizzes, getMyQuizzes } from "../services/quizService";
import { getRecommendations } from "../services/aiService";
import QuizCard from "../components/QuizCard";
import SearchBar from "../components/SearchBar";

const Section = ({ title, data, viewMoreLink, showViewMore = true }) => {
  const safeData = Array.isArray(data) ? data : [];

  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-indigo-700">{title}</h2>
        {showViewMore && safeData.length > 10 && viewMoreLink && (
          <button
            onClick={() => (window.location.href = viewMoreLink)}
            className="text-indigo-500 hover:underline"
          >
            View More
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {safeData.slice(0, 10).map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </section>
  );
};

function Dashboard() {
  const [recommended, setRecommended] = useState([]);
  const [publicQuizzes, setPublicQuizzes] = useState([]);
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [recRes, pubRes, myRes] = await Promise.all([
          getRecommendations(),
          getPublicQuizzes(1, 12),
          getMyQuizzes(1, 12),
        ]);

        setRecommended(recRes?.data?.data || []);
        setPublicQuizzes(pubRes?.data?.results || []);
        setMyQuizzes(myRes?.data?.results || []);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-10 w-10 text-indigo-600 mb-2"
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
          <p className="text-indigo-700 font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 mt-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-3">
          Welcome to AI Agent Quiz!
        </h1>
        <p className="text-lg text-gray-600">
          Practice, Learn & Improve with curated AI-generated quizzes across
          technologies.
        </p>
      </div>
      <SearchBar />

      <Section
        title="Recommended For You"
        data={recommended}
        showViewMore={false}
      />
      <Section
        title="Explore Quizzes"
        data={publicQuizzes}
        viewMoreLink="/quizzes/public"
      />
      <Section
        title="Your Quizzes"
        data={myQuizzes}
        viewMoreLink="/quizzes/my"
      />
    </div>
  );
}

export default Dashboard;
