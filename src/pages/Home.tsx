import { Box, Typography, Button, Paper } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box component="main" sx={{ p: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Status de Autenticação
        </Typography>
        <Typography color="primary" variant="h6" sx={{ mb: 2 }}>
          Status: {isAuthenticated ? "LOGADO ✅" : "NÃO LOGADO ❌"}
        </Typography>
        {user && (
          <Typography color="secondary" sx={{ mb: 2 }}>
            Usuário: {user.email}
          </Typography>
        )}
      </Paper>

      <Typography color="primary" variant="h5" sx={{ mb: 3 }}>
        Bem-vindo ao Sistema de Oração
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Box>
  );
}
