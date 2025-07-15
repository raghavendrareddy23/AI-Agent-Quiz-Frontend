// import { useEffect, useState } from "react";
// import { getTrendingQuizzes } from "../services/quizService";
// import QuizCard from "../components/QuizCard";

// function TrendingQuizzes() {
//   const [quizzes, setQuizzes] = useState([]);

//   useEffect(() => {
//     getTrendingQuizzes()
//       .then((res) => setQuizzes(res.data))
//       .catch((err) => console.error("Failed to load trending quizzes", err));
//   }, []);

//   console.log(quizzes)

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold text-indigo-700 mb-4">🔥 Trending Quizzes</h1>
//       {quizzes.length === 0 ? (
//         <p className="text-gray-600">No trending quizzes available.</p>
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

// export default TrendingQuizzes;
