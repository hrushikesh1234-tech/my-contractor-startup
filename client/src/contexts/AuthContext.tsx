import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from "react";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { User, LoginCredentials, RegisterData } from "@/lib/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for development testing
const MOCK_USER: User = {
  id: 1,
  username: "testuser",
  email: "user@example.com",
  fullName: "Test User",
  userType: "customer"
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // For development, set a mock user by default
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        credentials: "include",
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/auth/login", credentials);
      const userData = await res.json();
      setUser(userData);
      toast({
        title: "Login successful",
        description: `Welcome back, ${userData.fullName}!`,
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate, toast]);

  const register = useCallback(async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/auth/register", data);
      const userData = await res.json();
      toast({
        title: "Registration successful",
        description: "Your account has been created.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Please try again with different credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate, toast]);

  const logout = useCallback(async () => {
    try {
      await apiRequest("POST", "/api/auth/logout", {});
      setUser(null);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  }, [navigate, toast]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
