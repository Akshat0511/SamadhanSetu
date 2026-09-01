
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getCurrentUser,
} from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD AUTH DATA
  // ==========================================

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      // No token = user is not logged in
      if (!storedToken) {
        setLoading(false);
        return;
      }

      setToken(storedToken);

      // Load cached user first
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("USER PARSE ERROR:", error);

          localStorage.removeItem("user");
          setUser(null);
        }
      }

      // Verify token with backend
      try {
        const response = await getCurrentUser();

        console.log("CURRENT USER RESPONSE:", response);

        if (response?.success && response?.user) {
          setUser(response.user);

          localStorage.setItem(
            "user",
            JSON.stringify(response.user)
          );
        } else {
          throw new Error(
            response?.message || "Invalid authentication"
          );
        }
      } catch (error) {
        console.error(
          "AUTH VERIFICATION ERROR:",
          error
        );

        // Remove invalid token
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (credentials) => {
    try {
      const response = await loginUser(credentials);

      console.log("LOGIN RESPONSE:", response);

      if (!response) {
        throw new Error(
          "No response received from server."
        );
      }

      // Support both Axios response and normal response
      const data = response.data || response;

      if (data.success === false) {
        throw new Error(
          data.message || "Login failed."
        );
      }

      const authToken = data.token;
      const loggedInUser = data.user;

      // Token missing
      if (!authToken) {
        throw new Error(
          "Login successful but authentication token was not received."
        );
      }

      // User missing
      if (!loggedInUser) {
        throw new Error(
          "Login successful but user information was not received."
        );
      }

      // ========================================
      // SAVE TOKEN
      // ========================================

      localStorage.setItem(
        "token",
        authToken
      );

      // ========================================
      // SAVE USER
      // ========================================

      localStorage.setItem(
        "user",
        JSON.stringify(loggedInUser)
      );

      // ========================================
      // UPDATE STATE
      // ========================================

      setToken(authToken);
      setUser(loggedInUser);

      return {
        success: true,
        token: authToken,
        user: loggedInUser,
        message:
          data.message || "Login successful",
      };
    } catch (error) {
      console.error(
        "AUTH LOGIN ERROR:",
        error
      );

      throw new Error(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again."
      );
    }
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (userData) => {
    try {
      const response = await registerUser(userData);

      console.log(
        "REGISTER RESPONSE:",
        response
      );

      if (!response) {
        throw new Error(
          "No response received from server."
        );
      }

      // Support Axios + normal response
      const data = response.data || response;

      if (data.success === false) {
        throw new Error(
          data.message ||
            "Registration failed."
        );
      }

      const authToken = data.token;
      const registeredUser = data.user;

      // ========================================
      // SAVE TOKEN IF BACKEND RETURNS TOKEN
      // ========================================

      if (authToken) {
        localStorage.setItem(
          "token",
          authToken
        );

        setToken(authToken);
      }

      // ========================================
      // SAVE USER
      // ========================================

      if (registeredUser) {
        localStorage.setItem(
          "user",
          JSON.stringify(registeredUser)
        );

        setUser(registeredUser);
      }

      return {
        success: true,
        token: authToken || null,
        user: registeredUser || null,
        message:
          data.message ||
          "Registration successful",
      };
    } catch (error) {
      console.error(
        "AUTH REGISTER ERROR:",
        error
      );

      throw new Error(
        error?.response?.data?.message ||
          error?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  // ==========================================
  // UPDATE USER
  // ==========================================

  const updateUser = (updatedUser) => {
    setUser(updatedUser);

    if (updatedUser) {
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    } else {
      localStorage.removeItem("user");
    }
  };

  // ==========================================
  // AUTH STATUS
  // ==========================================

  const isAuthenticated =
    Boolean(token && user);

  // ==========================================
  // CONTEXT VALUE
  // ==========================================

  const value = {
    user,
    token,
    loading,
    isAuthenticated,

    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ==========================================
// USE AUTH HOOK
// ==========================================

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}

export default AuthContext;

