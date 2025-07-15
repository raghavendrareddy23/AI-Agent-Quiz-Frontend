import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizById } from "../services/quizService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { toast } from "react-toastify";

function QuizResult() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state || !state.answers) {
      navigate("/dashboard");
      return;
    }

    getQuizById(id)
      .then((res) => setQuiz(res.data))
      .catch(() => navigate("/dashboard"))
      .finally(() => setLoading(false));
  }, [id, navigate, state]);

  const handleCopyScorecard = () => {
    const resultText = `🎯 Quiz: ${quiz.title}\n📊 Score: ${state.score}/${state.total}\nTry it yourself at: https://ai-agent-quiz.netlify.app/quiz/${id}`;
    navigator.clipboard.writeText(resultText);
    toast.success("Scorecard copied to clipboard!");
  };

  const handleRetry = () => {
    navigate(`/quiz/${id}`);
  };

  if (loading || !quiz || !state?.answers) {
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
          <p className="text-indigo-700 font-medium">Loading Results and Generating Analytics...</p>
        </div>
      </div>
    );
  }

  const correct = state.score;
  const incorrect = state.total - correct;

  const chartData = [
    { label: "Correct", value: correct },
    { label: "Incorrect", value: incorrect },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto mt-16">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-indigo-700 mb-2">
          {quiz.title} - Results
        </h2>
        <p className="mb-6 text-gray-600 text-lg">
          You scored <strong>{correct}</strong> out of{" "}
          <strong>{state.total}</strong>
        </p>

        {/* <div className="w-full h-64 mb-8">
          <ResponsiveContainer>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="label" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        {/* Pie Chart */}
<div className="w-full flex justify-center items-center mb-8">
  <ResponsiveContainer width="100%" height={250}>
    <PieChart>
      <Tooltip />
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="label"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        <Cell fill="#4ade80" />   
        <Cell fill="#f87171" /> 
      </Pie>
    </PieChart>
  </ResponsiveContainer>
</div>


        {quiz.questions.map((q, index) => {
          const userAnswerId = state.answers[q.id];
          return (
            <div
              key={q.id}
              className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <p className="font-semibold text-gray-800 mb-3">
                {index + 1}. {q.question_text}
              </p>

              <div className="space-y-2 mb-2">
                {q.options.map((opt) => {
                  const isUserSelected = opt.id === userAnswerId;
                  const isOptionCorrect = opt.is_correct;

                  let optionClass = "bg-white text-gray-800";
                  if (isUserSelected && isOptionCorrect) {
                    optionClass =
                      "bg-green-100 text-green-800 border border-green-400";
                  } else if (isUserSelected && !isOptionCorrect) {
                    optionClass =
                      "bg-red-100 text-red-800 border border-red-400";
                  } else if (!isUserSelected && isOptionCorrect) {
                    optionClass =
                      "bg-green-50 text-green-700 border border-green-300";
                  }

                  return (
                    <div
                      key={opt.id}
                      className={`p-2 rounded-md ${optionClass} flex justify-between items-center`}
                    >
                      <span>{opt.option_text}</span>
                      {isUserSelected && (
                        <span className="text-sm font-medium">
                          {isOptionCorrect ? "Correct" : "Your Answer"}
                        </span>
                      )}
                      {!isUserSelected && isOptionCorrect && (
                        <span className="text-sm font-medium">
                          Correct Answer
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="text-sm text-gray-600 mt-2">
                <strong>Explanation:</strong> {q.explanation}
              </p>
            </div>
          );
        })}

        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded transition"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleRetry}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded transition"
          >
            Retry Quiz
          </button>
          <button
            onClick={handleCopyScorecard}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded transition"
          >
            Share Scorecard
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizResult;
