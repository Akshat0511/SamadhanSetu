import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach JWT token
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

// LOGIN
export const loginUser = async (userData) => {
  const response = await API.post("/auth/login", userData);

  return response.data;
};

// REGISTER
export const registerUser = async (userData) => {
  const response = await API.post("/auth/register", userData);

  return response.data;
};

// CURRENT USER
export const getCurrentUser = async () => {
  const response = await API.get("/auth/me");

  return response.data;
};

// LOGOUT
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default API;