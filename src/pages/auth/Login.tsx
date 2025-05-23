import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Link,
  Alert,
  Snackbar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthCard } from "../../components/AuthCard";
import { useAuth } from "../../hooks/useAuth";
import LanguageSelector from "../../components/LanguageSelector";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

interface LoginForm {
  email: string;
  senha: string;
}

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const schema = yup.object({
    email: yup
      .string()
      .email(t("login.invalidEmail"))
      .required(t("login.required")),
    senha: yup
      .string()
      .min(6, t("login.minPassword"))
      .required(t("login.required")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { login } = useAuth();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  function onSubmit(data: LoginForm) {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (
        (data.email === "teste@teste.com" ||
          data.email === "admin@admin.com") &&
        data.senha === "123456"
      ) {
        const role = data.email === "admin@admin.com" ? "admin" : "user";
        login(role);
        setSnackbar({
          open: true,
          message: t("login.mockSuccess"),
          severity: "success",
        });
        setTimeout(() => navigate("/"), 1000);
      } else {
        setSnackbar({
          open: true,
          message: t("login.mockError"),
          severity: "error",
        });
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
        py: { xs: 2, sm: 4 },
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
      <Box sx={{ position: "absolute", top: 24, right: 24, zIndex: 2 }}>
        <LanguageSelector />
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: 3,
            boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.18)",
            background:
              snackbar.severity === "success"
                ? "linear-gradient(90deg, #e0ffe7 0%, #f4fff9 100%)"
                : "linear-gradient(90deg, #ffe0e0 0%, #fff4f4 100%)",
            backdropFilter: "blur(8px)",
            border:
              snackbar.severity === "success"
                ? "1.5px solid #4caf50"
                : "1.5px solid #f44336",
            minWidth: 260,
            maxWidth: 420,
            pr: 1,
            marginTop: { xs: 2, sm: 3 },
            marginRight: { xs: 1, sm: 3 },
          },
        }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          iconMapping={{
            success: (
              <span style={{ fontSize: 24, color: "#4caf50", marginRight: 8 }}>
                ✔️
              </span>
            ),
            error: (
              <span style={{ fontSize: 24, color: "#f44336", marginRight: 8 }}>
                ❌
              </span>
            ),
          }}
          sx={{
            width: "100%",
            borderRadius: 3,
            fontWeight: 500,
            fontSize: 15,
            py: 0.7,
            px: 2,
            background: "transparent",
            color: "#222",
            alignItems: "center",
            boxShadow: "none",
            letterSpacing: 0.2,
            display: "flex",
            "& .MuiAlert-icon": {
              fontSize: 24,
              mr: 1.5,
              alignSelf: "flex-start",
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
      <AuthCard>
        <LockOutlinedIcon sx={{ fontSize: 52, color: "primary.main", mb: 1 }} />
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 700, letterSpacing: 0.5 }}
        >
          {t("login.title")}
        </Typography>
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
          {/* Link para cadastro removido */}
        </Typography>
      </AuthCard>
    </Box>
  );
}
