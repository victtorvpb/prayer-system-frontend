import { Routes, Route } from "react-router-dom";
import { AuthLayout } from "../layouts/AuthLayout";
import { MainLayout } from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import { PrivateRoute } from "./PrivateRoute";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Register />} />
        <Route path="/esqueci-senha" element={<ForgotPassword />} />
      </Route>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        {/* Outras rotas privadas */}
      </Route>
    </Routes>
  );
}
