import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "#a1c4fd33",
          top: -80,
          left: -80,
          zIndex: 0,
          filter: "blur(2px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "#c2e9fb44",
          bottom: 40,
          right: 60,
          zIndex: 0,
          filter: "blur(2px)",
        }}
      />
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 370,
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
        }}
      >
        <PersonAddAlt1Icon
          sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
        />
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Criar conta
        </Typography>
        <TextField label="Nome" fullWidth sx={{ mb: 2 }} autoComplete="name" />
        <TextField
          label="E-mail"
          fullWidth
          sx={{ mb: 2 }}
          autoComplete="email"
        />
        <TextField
          label="Senha"
          type={showPassword ? "text" : "password"}
          fullWidth
          sx={{ mb: 2 }}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Mostrar senha"
                  onClick={() => setShowPassword((s) => !s)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Confirmar senha"
          type={showConfirm ? "text" : "password"}
          fullWidth
          sx={{ mb: 2 }}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Mostrar senha"
                  onClick={() => setShowConfirm((s) => !s)}
                  edge="end"
                >
                  {showConfirm ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mb: 2 }}
        >
          Cadastrar
        </Button>
        <Typography variant="body2">
          Já tem uma conta?{" "}
          <Link component={RouterLink} to="/login" underline="hover">
            Voltar ao login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
