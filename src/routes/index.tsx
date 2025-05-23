import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register"; // Removido
import ForgotPassword from "../pages/auth/ForgotPassword";
import Home from "../pages/home/Home";
import Navbar from "../components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { UserList, CreateUser, EditUser } from "../pages/admin/users";
import {
  PrayerPoints,
  CreatePrayerPoint,
  EditPrayerPoint,
} from "../pages/admin/prayer-points";

// Componente para proteger rotas de administrador
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

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
        {/* Rotas protegidas para administrador */}
        <Route
          path="/register-user"
          element={
            <AdminRoute>
              <UserList />
            </AdminRoute>
          }
        />
        <Route
          path="/register-user/create"
          element={
            <AdminRoute>
              <CreateUser />
            </AdminRoute>
          }
        />
        <Route
          path="/register-user/edit/:id"
          element={
            <AdminRoute>
              <EditUser />
            </AdminRoute>
          }
        />
        <Route
          path="/prayer-points"
          element={
            <AdminRoute>
              <PrayerPoints />
            </AdminRoute>
          }
        />
        <Route
          path="/prayer-points/create"
          element={
            <AdminRoute>
              <CreatePrayerPoint />
            </AdminRoute>
          }
        />
        <Route
          path="/prayer-points/edit/:id"
          element={
            <AdminRoute>
              <EditPrayerPoint />
            </AdminRoute>
          }
        />
        {/* Outras rotas protegidas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Navbar>
  );
}
