import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register"; // Removido
import ForgotPassword from "../pages/auth/ForgotPassword";
import Home from "../pages/home/Home";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";

export function AppRoutes() {
  const { isAuthenticated } = useAuth();

  // Se não estiver autenticado, só permite acesso às rotas públicas
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/cadastrar" element={<Register />} /> */}
        <Route path="/esqueci-senha" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Se estiver autenticado, mostra o layout protegido com Navbar
  return (
    <Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Outras rotas protegidas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Navbar>
  );
}
