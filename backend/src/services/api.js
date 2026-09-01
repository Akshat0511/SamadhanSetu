
import axios from "axios";

// =====================================================
// API CONFIGURATION
// =====================================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

// =====================================================
// AXIOS INSTANCE
// =====================================================

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// REQUEST INTERCEPTOR
// Automatically attach JWT token
// =====================================================

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =====================================================
// RESPONSE INTERCEPTOR
// Handle authentication errors
// =====================================================

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 401) {
      console.error(
        "AUTHENTICATION ERROR:",
        message
      );

      // Remove invalid authentication data
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Do NOT redirect here.
      // AuthContext / protected routes can handle redirect.
    }

    return Promise.reject(error);
  }
);

// =====================================================
// AUTH APIs
// =====================================================

export const loginUser = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post(
    "/auth/register",
    userData
  );

  return response.data;
};

// Get currently logged-in user
export const getCurrentUser = async () => {
  const response = await api.get(
    "/auth/me"
  );

  return response.data;
};

// =====================================================
// CHALLENGE APIs
// =====================================================

export const getChallenges = async () => {
  const response = await api.get(
    "/challenges"
  );

  return response.data;
};

export const getMyChallenges = async () => {
  const response = await api.get(
    "/challenges/my"
  );

  return response.data;
};

export const getChallengeById = async (id) => {
  const response = await api.get(
    `/challenges/${id}`
  );

  return response.data;
};

export const createChallenge = async (
  challengeData
) => {
  const response = await api.post(
    "/challenges",
    challengeData
  );

  return response.data;
};

export const updateChallengeStatus = async (
  id,
  status
) => {
  const response = await api.put(
    `/challenges/${id}/status`,
    { status }
  );

  return response.data;
};

export const getChallengeMatches = async (
  id
) => {
  const response = await api.get(
    `/challenges/${id}/match`
  );

  return response.data;
};

// =====================================================
// PROJECT APIs
// =====================================================

export const getProjects = async () => {
  const response = await api.get(
    "/projects"
  );

  return response.data;
};

export const getProjectById = async (id) => {
  const response = await api.get(
    `/projects/${id}`
  );

  return response.data;
};

// =====================================================
// UNIVERSITY APIs
// =====================================================

export const getUniversities = async () => {
  const response = await api.get(
    "/universities"
  );

  return response.data;
};

// =====================================================
// INDUSTRY APIs
// =====================================================

export const getIndustryPartners =
  async () => {
    const response = await api.get(
      "/industry-partners"
    );

    return response.data;
  };

// =====================================================
// AI APIs
// =====================================================

export const getAIRecommendations =
  async (data) => {
    const response = await api.post(
      "/ai",
      data
    );

    return response.data;
  };

// =====================================================
// MATCHING APIs
// =====================================================

export const getMatches = async () => {
  const response = await api.get(
    "/matching"
  );

  return response.data;
};

// =====================================================
// RECOMMENDATION APIs
// =====================================================

export const getRecommendations =
  async () => {
    const response = await api.get(
      "/recommendations"
    );

    return response.data;
  };

// =====================================================
// DEFAULT EXPORT
// =====================================================

export default api;

