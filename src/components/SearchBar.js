import { useEffect, useState } from "react";
import { generateQuiz, getPublicQuizzes } from "../services/quizService";
import { getTrendingQuizes } from "../services/aiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash.debounce";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [techList, setTechList] = useState([]);
  const [existingMatch, setExistingMatch] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const staticTech = [
      "Python",
      "JavaScript",
      "React",
      "Node.js",
      "HTML",
      "CSS",
      "SQL",
      "Java",
      "TypeScript",
      "C++",
      "Machine Learning",
      "AI",
      "Django",
      "Flask",
      "TailwindCSS",
      "Next.js",
      "MongoDB",
      "PostgreSQL",
      "Git",
      "GitHub",
    ];

    getTrendingQuizes().then((res) => {
      const trending = Array.isArray(res?.data?.data)
        ? res.data.data.map((item) => item.technology)
        : [];
      const unique = Array.from(new Set([...staticTech, ...trending]));
      setTechList(unique);
    });
  }, []);

  useEffect(() => {
    const debounced = debounce(async (text) => {
      const matches = techList.filter((tech) =>
        tech.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(matches);

      const initialRes = await getPublicQuizzes(1, 1);
      const total = initialRes?.data?.total_results || 100;

      const publicRes = await getPublicQuizzes(1, total);
      const found = publicRes?.data?.results?.find(
        (q) => q.technology.toLowerCase() === text.toLowerCase()
      );
      setExistingMatch(found || null);
    }, 300);

    if (searchTerm.length > 1) {
      debounced(searchTerm);
    } else {
      setSuggestions([]);
      setExistingMatch(null);
    }

    return () => debounced.cancel();
  }, [searchTerm, techList]);

  const handleSelect = (tech, action = "existing") => {
    if (action === "existing" && existingMatch) {
      navigate(`/quiz/${existingMatch.id}`);
    } else {
      handleCreateQuiz(tech);
    }
  };

  const handleCreateQuiz = async (tech) => {
    try {
      setLoading(true);
      const res = await generateQuiz(tech, "medium", 15, true);
      toast.success("Generated a new quiz!");
      navigate(`/quiz/${res.data.id}`);
    } catch {
      toast.error("Could not generate quiz due to exceed rate limits, try after sometime");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    if (existingMatch) {
      handleSelect(searchTerm, "existing");
    } else {
      handleCreateQuiz(searchTerm);
    }
  };

  return (
    <div className="relative max-w-xl mx-auto mb-6">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
        <label className="whitespace-nowrap text-xl font-medium text-indigo-700">
          Search/Generate Quiz:
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type a technology (e.g., Python, React) and press Enter to create a quiz"
          className="flex-1 p-3 border rounded shadow"
        />
      </form>

      {loading && (
        <div className="flex justify-center items-center gap-2 text-indigo-600 mt-2">
          <svg
            className="animate-spin h-5 w-5 text-indigo-600"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <span className="text-sm font-medium">Generating quiz with AI...</span>
        </div>
      )}

      {suggestions.length > 0 && !loading && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 shadow max-h-64 overflow-auto">
          {suggestions.map((tech, index) => (
            <li
              key={index}
              className="p-2 hover:bg-indigo-100 cursor-pointer flex justify-between items-center"
            >
              <span onClick={() => handleSelect(tech, "existing")}>
                {tech} (Go to existing)
              </span>
              <button
                onClick={() => handleSelect(tech, "new")}
                className="text-sm text-indigo-600 hover:underline"
              >
                ➕ New
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
