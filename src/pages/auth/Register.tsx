import {
  Box,
  Typography,
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
import { AuthCard } from "../../components/AuthCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../../components/LanguageSelector";
import ToastNotification from "../../components/ToastNotification";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });
  const schema = yup.object({
    nome: yup.string().required(t("register.required")),
    email: yup
      .string()
      .email(t("register.invalidEmail"))
      .required(t("register.required")),
    senha: yup
      .string()
      .min(6, t("register.minPassword"))
      .required(t("register.required")),
    confirmar: yup
      .string()
      .oneOf([yup.ref("senha")], t("register.notMatch"))
      .required(t("register.confirm")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: any) {
    setLoading(true);
    setSnackbar({ open: false, message: "", severity: "success" });
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: t("register.mockSuccess"),
        severity: "success",
      });
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
      <ToastNotification
        open={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
      <AuthCard>
        <PersonAddAlt1Icon
          sx={{ fontSize: 52, color: "primary.main", mb: 1 }}
        />
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 700, letterSpacing: 0.5 }}
        >
          {t("register.title")}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            label={t("register.name")}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="name"
            {...register("nome")}
            error={!!errors.nome}
            helperText={errors.nome?.message as string}
          />
          <TextField
            label={t("register.email")}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
          <TextField
            label={t("register.password")}
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="new-password"
            {...register("senha")}
            error={!!errors.senha}
            helperText={errors.senha?.message as string}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={t("register.password")}
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
            label={t("register.confirm")}
            type={showConfirm ? "text" : "password"}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="new-password"
            {...register("confirmar")}
            error={!!errors.confirmar}
            helperText={errors.confirmar?.message as string}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={t("register.confirm")}
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
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mb: 2 }}
            disabled={loading}
          >
            {loading ? t("register.submit") + "..." : t("register.submit")}
          </Button>
        </form>
        <Typography variant="body2">
          {t("register.already")}{" "}
          <Link component={RouterLink} to="/login" underline="hover">
            {t("register.back")}
          </Link>
        </Typography>
      </AuthCard>
    </Box>
  );
}
