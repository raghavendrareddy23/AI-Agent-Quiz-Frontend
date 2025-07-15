import { useEffect, useState } from "react";
import { getPublicQuizzes } from "../services/quizService";
import QuizCard from "../components/QuizCard";
import { useNavigate } from "react-router-dom";

function PublicQuizzes() {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTech, setFilterTech] = useState("All");
  const [page, setPage] = useState(1);
  const [techOptions, setTechOptions] = useState([]);
  const limit = 12;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const first = await getPublicQuizzes(1, 1);
        const total = first?.data?.total_results || 100;

        const allRes = await getPublicQuizzes(1, total);
        const all = allRes?.data?.results || [];

        setAllQuizzes(all);
        setFilteredQuizzes(all);
        setTechOptions(["All", ...new Set(all.map((q) => q.technology))]);
      } catch (err) {
        console.error("Failed to load quizzes", err);
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    let filtered = [...allQuizzes];

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.technology.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterTech !== "All") {
      filtered = filtered.filter(
        (quiz) => quiz.technology.toLowerCase() === filterTech.toLowerCase()
      );
    }

    setFilteredQuizzes(filtered);
    setPage(1); 
  }, [searchTerm, filterTech, allQuizzes]);

  const totalPages = Math.ceil(filteredQuizzes.length / limit);
  const paginated = filteredQuizzes.slice((page - 1) * limit, page * limit);

  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);
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

      <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-indigo-700">Public Quizzes</h1>

        <input
          type="text"
          placeholder="Search by title or tech..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-64 p-2 border rounded shadow"
        />

        <select
          value={filterTech}
          onChange={(e) => setFilterTech(e.target.value)}
          className="w-full sm:w-48 p-2 border rounded shadow"
        >
          {techOptions.map((tech, i) => (
            <option key={i} value={tech}>
              {tech}
            </option>
          ))}
        </select>
      </div>

      {paginated.length === 0 ? (
        <p className="text-gray-600">No public quizzes found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginated.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} />
            ))}
          </div>

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

export default PublicQuizzes;
