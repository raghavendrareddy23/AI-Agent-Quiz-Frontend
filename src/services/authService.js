import axios from 'axios';

const API_URL = 'https://ai-agent-quiz-platform.onrender.com/api/v1/auth';

export const register = (data) => axios.post(`${API_URL}/register`, data);

export const login = (data) =>
  axios.post(`${API_URL}/token`, data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

export const getMe = (token) =>
  axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
