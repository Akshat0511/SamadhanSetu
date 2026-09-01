import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =====================================================
// JWT TOKEN AUTOMATICALLY ATTACH
// =====================================================

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =====================================================
// HANDLE 401
// =====================================================

API.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      const message = error.response?.data?.message;

      if (
        message === "Invalid token. Please login again." ||
        message === "Token has expired. Please login again." ||
        message === "No token provided" ||
        message === "Invalid authorization format"
      ) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    return Promise.reject(error);
  }
);

// =====================================================
// AUTH APIs
// =====================================================

export const loginUser = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};

export const registerUser = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await API.get("/auth/me");
  return response.data;
};

// =====================================================
// CHALLENGE APIs
// =====================================================

export const getChallenges = async () => {
  const response = await API.get("/challenges");
  return response.data;
};

export const getChallengeById = async (id) => {
  const response = await API.get(`/challenges/${id}`);
  return response.data;
};

export const createChallenge = async (data) => {
  const response = await API.post("/challenges", data);
  return response.data;
};

export const updateChallenge = async (id, data) => {
  const response = await API.put(`/challenges/${id}`, data);
  return response.data;
};

export const deleteChallenge = async (id) => {
  const response = await API.delete(`/challenges/${id}`);
  return response.data;
};

export const updateChallengeStatus = async (id, status) => {
  const response = await API.put(
    `/challenges/${id}/status`,
    { status }
  );

  return response.data;
};

export const getMyChallenges = async () => {
  const response = await API.get("/challenges/my");
  return response.data;
};

export default API;