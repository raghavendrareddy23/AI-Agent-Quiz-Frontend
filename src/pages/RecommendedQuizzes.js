// import { useEffect, useState } from "react";
// import { getRecommendations } from "../services/quizService";
// import QuizCard from "../components/QuizCard";

// function RecommendedQuizzes() {
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     getRecommendations()
//       .then((res) => setQuizzes(res.data))
//       .catch((err) => console.error("Failed to load recommendations", err));
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-indigo-700 mb-4">🤖 Recommended For You</h1>
//       {quizzes.length === 0 ? (
//         <p className="text-gray-600">No recommended quizzes found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {quizzes.map((quiz) => (
//             <QuizCard key={quiz.id} quiz={quiz} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default RecommendedQuizzes;
