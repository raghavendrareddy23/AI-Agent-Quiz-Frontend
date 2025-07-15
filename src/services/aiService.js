import axios from "axios";

const API = "https://ai-agent-quiz-platform.onrender.com/api/v1/ai";
const authHeader = () => ({
  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
});

export const getRecommendations = () =>
  axios.get(`${API}/recommendations`, { headers: authHeader() });
export const getTrendingQuizes = () => axios.get(`${API}/trending`);
export const getLeaderBoard = () => axios.get(`${API}/leaderboard`);
