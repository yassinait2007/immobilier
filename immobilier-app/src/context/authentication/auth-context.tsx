import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useLayoutEffect,
} from "react";

import { User } from "@/types/user";
import apiClient from "@/api/apiClient";
import { getToken, removeToken, setToken } from "@/utils/tokenStorage";
import { handleAuthError } from "@/features/Auth/components/AuthErrorHandler";
import {
  fetchCurrentUser,
  forgotPasswordRequest,
  loginRequest,
  registerRequest,
  resetPasswordRequest,
  verifyOtpRequest,
} from "./api/authApi";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (password: string, token: string) => Promise<any>;
  verifyOtp: (otp: string, email: string) => Promise<any>;
  clearError: () => void;
  isAuthenticated: boolean;
  updateUser: (userData: User) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getInitialAuthState = () => {
  const token = getToken();
  if (token) {
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return {
      isAuthenticated: true,
      loading: true,
    };
  }
  return {
    isAuthenticated: false,
    loading: false,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialState = getInitialAuthState();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(initialState.loading);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialState.isAuthenticated
  );

  useLayoutEffect(() => {
    const verifyAuthentication = async () => {
      const token = getToken();

      if (!token) {
        setUser(null);
        setIsAuthenticated(false);
        setLoading(false);
        delete apiClient.defaults.headers.common["Authorization"];
        return;
      }

      try {
        const res = await fetchCurrentUser();
        setUser(res.data);
        console.log("==============current user", res.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.warn("Token validation failed:", error);
        removeToken();
        delete apiClient.defaults.headers.common["Authorization"];
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    if (initialState.isAuthenticated) {
      verifyAuthentication();
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await loginRequest(email, password);
      const data = res.data;

      if (!data.success) throw new Error(data.message || "Login failed");

      const token = data.data.accessToken;
      setToken(token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userRes = await fetchCurrentUser();
      setUser(userRes.data);
      setIsAuthenticated(true);
    } catch (err: any) {
      const message = handleAuthError(err);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await registerRequest(firstName, lastName, email, password);
      const data = res.data;

      if (!data.success) throw new Error(data.message || "Registration failed");

      const token = data.data.accessToken;
      setToken(token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const userRes = await fetchCurrentUser();
      setUser(userRes.data);
      setIsAuthenticated(true);
    } catch (err: any) {
      const message = handleAuthError(err);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    delete apiClient.defaults.headers.common["Authorization"];
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await forgotPasswordRequest(email);
      return res.data;
    } catch (err: any) {
      const message = handleAuthError(err);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (password: string, token: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await resetPasswordRequest(password, token);
      return res.data;
    } catch (err: any) {
      const message = handleAuthError(err);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (otp: string, email: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await verifyOtpRequest(otp, email);
      return res.data;
    } catch (err: any) {
      const message = handleAuthError(err);
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const updateUser = (userData: User) => {
    setUser(userData);
  };

  const refreshUser = async () => {
    const token = getToken();
    if (token && isAuthenticated) {
      try {
        const res = await fetchCurrentUser();
        setUser(res.data);
      } catch (err) {
        console.error("Failed to refresh user:", err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        verifyOtp,
        clearError,
        isAuthenticated,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
