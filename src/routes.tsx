import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Register from "./pages/Register";
import { Box, Button, Typography } from "@mui/material";

function Home() {
  return (
    <Box component="main" sx={{ p: 4 }}>
      <Typography color="primary">Olá Material UI!</Typography>
      <Button variant="contained" sx={{ mt: 4 }}>
        Botão Padrão
      </Button>
    </Box>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/esqueci-senha" element={<ForgotPassword />} />
      <Route path="/cadastrar" element={<Register />} />
      <Route path="/" element={<Home />} />
      {/* Outras rotas */}
    </Routes>
  );
}
