/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: { email: string } | null;
}

// Criar o contexto com valor inicial mais explícito
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

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return getAuthStatus();
  });

  const [user, setUser] = useState<{ email: string } | null>(() => {
    return isAuthenticated ? { email: "teste@teste.com" } : null;
  });

  const login = useCallback(() => {
    try {
      localStorage.setItem("mock_auth", "true");
      setIsAuthenticated(true);
      setUser({ email: "teste@teste.com" });
    } catch (err) {
      console.error("Error setting localStorage:", err);
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem("mock_auth");
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
      setUser(newStatus ? { email: "teste@teste.com" } : null);
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
