import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import authService from "../services/authService";
import { getUserRole } from "../utils/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);

    try {
      const response =
        await authService.login(
          email,
          password
        );

      localStorage.setItem(
        "token",
        response.token
      );

      const role = getUserRoleFromToken(
        response.token
      );

      const userData = {
        userId: response.userId,
        email: response.email,
        fullName: response.fullName,
        role: role,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      setToken(response.token);
      setUser(userData);

      return response;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    fullName,
    email,
    password
  ) => {
    setLoading(true);

    try {
      return await authService.register(
        fullName,
        email,
        password
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [token]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const getUserRoleFromToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    return (
      payload[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ] || null
    );
  } catch (error) {
    console.error(
      "Failed to read user role:",
      error
    );

    return null;
  }
};

export const useAuth = () => {
  return useContext(AuthContext);
};