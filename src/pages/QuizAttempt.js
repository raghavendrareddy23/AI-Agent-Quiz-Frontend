// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getQuizById, recordQuizAttempt } from "../services/quizService";
// import { toast } from "react-toastify";

// function QuizAttempt() {
//   const { id } = useParams();
//   const [quiz, setQuiz] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [answers, setAnswers] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getQuizById(id)
//       .then((res) => {
//         setQuiz(res.data);
//       })
//       .catch(() => {
//         toast.error("Quiz not found");
//         navigate("/dashboard");
//       })
//       .finally(() => setLoading(false));
//   }, [id, navigate]);

//   const handleOptionChange = (questionId, optionId) => {
//     setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
//   };

//   const handleSubmit = async () => {
//     if (!quiz || Object.keys(answers).length !== quiz.questions.length) {
//       toast.error("Please answer all questions.");
//       return;
//     }

//     setSubmitting(true);

//     const correctCount = quiz.questions.reduce((acc, q) => {
//       const selected = answers[q.id];
//       const correct = q.options.find(
//         (opt) => opt.id === selected && opt.is_correct
//       );
//       return acc + (correct ? 1 : 0);
//     }, 0);

//     const attemptData = {
//       quiz_id: quiz.id,
//       score: correctCount,
//       total_questions: quiz.questions.length,
//       completed_at: new Date().toISOString(),
//       answers: Object.entries(answers).map(
//         ([question_id, selected_option_id]) => ({
//           question_id: Number(question_id),
//           selected_option_id,
//         })
//       ),
//     };

//     try {
//       await recordQuizAttempt(attemptData);
//       toast.success(`You scored ${correctCount}/${quiz.questions.length}`);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//       navigate(`/results/${quiz.id}`, {
//         state: {
//           score: correctCount,
//           total: quiz.questions.length,
//           answers,
//         },
//       });
//     } catch {
//       toast.error("Failed to submit quiz.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh] mt-16">
//         <svg
//           className="animate-spin h-8 w-8 text-indigo-600"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           ></circle>
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
//           ></path>
//         </svg>
//         <p className="text-indigo-700 font-medium">Loading Quiz...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 max-w-4xl mx-auto mt-16">
//       <div className="mb-4">
//         <button
//           onClick={() => navigate("/dashboard")}
//           className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 transition"
//         >
//           ← Back to Dashboard
//         </button>
//       </div>

//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-3xl font-bold text-indigo-700 mb-4">
//           {quiz.title}
//         </h2>
//         <p className="text-sm text-gray-500 mb-6 italic">
//           Technology: {quiz.technology}
//         </p>

//         {quiz.questions.map((q, index) => (
//           <div key={q.id} className="mb-6 bg-gray-50 p-4 rounded-lg border">
//             <div className="flex justify-between items-center mb-2">
//               <p className="font-semibold text-gray-800">
//                 {index + 1}. {q.question_text}
//               </p>
//               <span className="text-sm text-gray-500">
//                 Question {index + 1} of {quiz.questions.length}
//               </span>
//             </div>
//             <div className="space-y-2">
//               {q.options.map((opt) => (
//                 <label
//                   key={opt.id}
//                   className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-indigo-50 ${
//                     answers[q.id] === opt.id ? "bg-indigo-100" : ""
//                   }`}
//                 >
//                   <input
//                     type="radio"
//                     name={`question-${q.id}`}
//                     value={opt.id}
//                     checked={answers[q.id] === opt.id}
//                     onChange={() => handleOptionChange(q.id, opt.id)}
//                     className="accent-indigo-600"
//                   />
//                   <span className="text-gray-700">{opt.option_text}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         ))}

//         <button
//           disabled={submitting}
//           onClick={handleSubmit}
//           className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
//         >
//           {submitting ? "Submitting..." : "Submit Quiz"}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default QuizAttempt;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById, recordQuizAttempt } from "../services/quizService";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function QuizAttempt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { username } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getQuizById(id)
      .then((res) => setQuiz(res.data))
      .catch(() => {
        toast.error("Quiz not found");
        navigate("/dashboard");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleOptionChange = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    if (!quiz || Object.keys(answers).length !== quiz.questions.length) {
      toast.error("Please answer all questions.");
      return;
    }

    const correctCount = quiz.questions.reduce((acc, q) => {
      const selected = answers[q.id];
      const correct = q.options.find((opt) => opt.id === selected && opt.is_correct);
      return acc + (correct ? 1 : 0);
    }, 0);

    const attemptData = {
      quiz_id: quiz.id,
      score: correctCount,
      total_questions: quiz.questions.length,
      completed_at: new Date().toISOString(),
      answers: Object.entries(answers).map(([question_id, selected_option_id]) => ({
        question_id: Number(question_id),
        selected_option_id,
      })),
    };

    // If user is not logged in
    if (!username) {
      const confirmLogin = window.confirm("You need to login/signup to view your results. Proceed?");
      if (confirmLogin) {
        localStorage.setItem("pending_attempt", JSON.stringify(attemptData));
        localStorage.setItem("redirect_after_login", `/results/${quiz.id}`);
        navigate("/login");
      } else {
        navigate("/");
      }
      return;
    }

    try {
      setSubmitting(true);
      await recordQuizAttempt(attemptData);
      toast.success(`You scored ${correctCount}/${quiz.questions.length}`);
      navigate(`/results/${quiz.id}`, {
        state: {
          score: correctCount,
          total: quiz.questions.length,
          answers,
        },
      });
    } catch {
      toast.error("Failed to submit quiz.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh] mt-16">
        <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
        </svg>
        <p className="text-indigo-700 font-medium ml-3">Loading Quiz...</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-16">
      <div className="mb-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">{quiz.title}</h2>
        <p className="text-sm text-gray-500 mb-6 italic">Technology: {quiz.technology}</p>

        {quiz.questions.map((q, index) => (
          <div key={q.id} className="mb-6 bg-gray-50 p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-800">{index + 1}. {q.question_text}</p>
              <span className="text-sm text-gray-500">Question {index + 1} of {quiz.questions.length}</span>
            </div>
            <div className="space-y-2">
              {q.options.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-indigo-50 ${
                    answers[q.id] === opt.id ? "bg-indigo-100" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${q.id}`}
                    value={opt.id}
                    checked={answers[q.id] === opt.id}
                    onChange={() => handleOptionChange(q.id, opt.id)}
                    className="accent-indigo-600"
                  />
                  <span className="text-gray-700">{opt.option_text}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <button
          disabled={submitting}
          onClick={handleSubmit}
          className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2 rounded transition disabled:opacity-50"
        >
          {submitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
}

export default QuizAttempt;
