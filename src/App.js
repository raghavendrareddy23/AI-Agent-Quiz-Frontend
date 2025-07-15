import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TrendingQuizzes from "./pages/TrendingQuizzes";
import RecommendedQuizzes from "./pages/RecommendedQuizzes";
import PublicQuizzes from "./pages/PublicQuizzes";
import MyQuizzes from "./pages/MyQuizzes";
import QuizAttempt from "./pages/QuizAttempt";
import QuizCreate from "./pages/QuizCreate";
import QuizResult from "./pages/QuizResult";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/dashboard/create" element={<QuizCreate/>} />
        <Route path="/quizzes/trending" element={<TrendingQuizzes />} />
        <Route path="/quizzes/recommended" element={<RecommendedQuizzes />} />
        <Route path="/quizzes/public" element={<PublicQuizzes />} />
        <Route path="/quizzes/my" element={<MyQuizzes />} />
        <Route path="/quiz/:id" element={<QuizAttempt />} />
        <Route path="/results/:id" element={<QuizResult />} />
        <Route path="/leaderboard" element={<Leaderboard />} />


      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
