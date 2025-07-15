import { useNavigate } from "react-router-dom";

function QuizCard({ quiz }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/quiz/${quiz.id}`)}
      className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition p-4 border hover:border-indigo-400"
    >
      <h3 className="text-lg font-semibold text-indigo-700 mb-1">
        {quiz.title}
      </h3>
      <p className="text-sm text-gray-600 mb-2">
        {quiz.description || `Test your skills on ${quiz.technology}`}
      </p>

      <div className="text-xs text-gray-500 flex justify-between">
        <span>
          Tech: <strong>{quiz.technology}</strong>
        </span>
        <span>
          Difficulty: <strong>{quiz.difficulty}</strong>
        </span>
        {/* <span>{quiz.num_questions} Qs</span> */}
      </div>
    </div>
  );
}

export default QuizCard;
