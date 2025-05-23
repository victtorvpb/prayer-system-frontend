/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import type { User } from "../types";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (role?: "user" | "admin") => void;
  logout: () => void;
  user: User | null;
}

// Valor inicial do contexto
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  // Verificação mais robusta do localStorage
  const getAuthStatus = () => {
    try {
      const authValue = localStorage.getItem("mock_auth");
      const status = authValue === "true";
      return status;
    } catch (err) {
      console.error("Error reading from localStorage:", err);
      return false;
    }
  };

  const getUserFromStorage = () => {
    const userValue = localStorage.getItem("mock_user");
    return userValue ? (JSON.parse(userValue) as User) : null;
  };

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return getAuthStatus();
  });

  const [user, setUser] = useState<User | null>(() => {
    return isAuthenticated ? getUserFromStorage() : null;
  });

  // Agora o login pode receber o role
  const login = useCallback((role: "user" | "admin" = "user") => {
    try {
      localStorage.setItem("mock_auth", "true");
      const userData: User = {
        id: "1",
        nome: "Usuário Teste",
        email: "teste@teste.com",
        role,
        ativo: true,
      };
      localStorage.setItem("mock_user", JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
    } catch (err) {
      console.error("Error setting localStorage:", err);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("mock_auth");
      localStorage.removeItem("mock_user");
      setIsAuthenticated(false);
      setUser(null);
    } catch (err) {
      console.error("Error removing from localStorage:", err);
    }
  }, []);

  // Sincroniza com outras abas
  useEffect(() => {
    const syncAuth = () => {
      const newStatus = getAuthStatus();
      setIsAuthenticated(newStatus);
      setUser(newStatus ? getUserFromStorage() : null);
    };

    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  const contextValue = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    console.error("useAuth deve ser usado dentro de AuthProvider");
    // Valor fallback para evitar quebras
    return {
      isAuthenticated: false,
      user: null,
      login: () => {},
      logout: () => {},
    };
  }
  return context;
}
