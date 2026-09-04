import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api",

  headers: {
    "Content-Type":
      "application/json",
  },
});

// =====================================================
// JWT INTERCEPTOR
// =====================================================

API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error)
);

// =====================================================
// AUTH
// =====================================================

export const loginUser =
  async (userData) => {
    const response =
      await API.post(
        "/auth/login",
        userData
      );

    return response.data;
  };

export const registerUser =
  async (userData) => {
    const response =
      await API.post(
        "/auth/register",
        userData
      );

    return response.data;
  };

export const getCurrentUser =
  async () => {
    const response =
      await API.get(
        "/auth/me"
      );

    return response.data;
  };

export const logoutUser = () => {
  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );
};

// =====================================================
// AI ANALYSIS
// =====================================================

export const analyzeChallenge =
  async (challengeId) => {
    const response =
      await API.post(
        `/ai/analyze/${challengeId}`
      );

    return response.data;
  };

// =====================================================
// MATCHING
// =====================================================

export const getChallengeMatching =
  async (challengeId) => {
    const response =
      await API.get(
        `/matching/${challengeId}`
      );

    return response.data;
  };

// =====================================================
// RECOMMENDATIONS
// =====================================================

export const getRecommendations =
  async (challengeId) => {
    const response =
      await API.get(
        `/recommendations/challenges/${challengeId}`
      );

    return response.data;
  };

export default API;