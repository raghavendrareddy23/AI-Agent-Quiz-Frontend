import axios from "axios";

const API = "https://ai-agent-quiz-platform.onrender.com/api/v1/quiz";
const authHeader = () => ({
  Authorization: `Bearer ${sessionStorage.getItem("token")}`,
});

export const generateQuiz = (technology, difficulty, num_questions, is_public = true) =>
  axios.post(`${API}/generate`, null, {
    params: { technology, difficulty, num_questions, is_public },
    headers: authHeader(),
  });

export const createQuizManual = (quizData) =>
  axios.post(`${API}/create`, quizData, { headers: authHeader() });

export const getPublicQuizzes = (page, limit) =>
  axios.get(`${API}/public?page=${page}&limit=${limit}`);

export const getMyQuizzes = (page, limit) =>
  axios.get(`${API}/user?page=${page}&limit=${limit}`, { headers: authHeader() });

export const getQuizById = (id) =>
  axios.get(`${API}/${id}`);

export const recordQuizAttempt = (attemptData) =>
  axios.post(`${API}/submit`, attemptData, { headers: authHeader() });

export const getMyAttempts = () =>
  axios.get(`${API}/users/attempt`, { headers: authHeader() });



