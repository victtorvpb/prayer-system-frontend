import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/useAuth";

const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  senha: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo obrigatório"),
});

interface LoginFormData {
  email: string;
  senha: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();

  function onSubmit(data: LoginFormData) {
    setLoading(true);
    setSuccess(null);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      if (data.email === "teste@teste.com" && data.senha === "123456") {
        login();
        setSuccess(t("login.mockSuccess"));
        setTimeout(() => navigate("/"), 1000);
      } else {
        setError(t("login.mockError"));
      }
    }, 1200);
  }

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
      {/* Círculos decorativos */}
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
      <AuthCard>
        <LockOutlinedIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          {t("login.title")}
        </Typography>
        <Typography
          color="secondary"
          sx={{ mb: 2, position: "relative", p: 1, borderRadius: 1 }}
        >
          Status:{" "}
          {isAuthenticated ? `LOGADO como ${user?.email} ✅` : "DESLOGADO ❌"}
        </Typography>
        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            label={t("login.email")}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
          <TextField
            label={t("login.password")}
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{ mb: 1 }}
            autoComplete="current-password"
            {...register("senha")}
            error={!!errors.senha}
            helperText={errors.senha?.message as string}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={t("login.password")}
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              mb: 2,
            }}
          >
            <Link
              component={RouterLink}
              to="/esqueci-senha"
              underline="hover"
              variant="body2"
            >
              {t("login.forgot")}
            </Link>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mb: 2 }}
            disabled={loading}
          >
            {loading ? t("login.submit") + "..." : t("login.submit")}
          </Button>
        </form>
        <Typography variant="body2">
          {t("login.noAccount")}{" "}
          <Link component={RouterLink} to="/cadastrar" underline="hover">
            {t("login.create")}
          </Link>
        </Typography>
      </AuthCard>
    </Box>
  );
}
