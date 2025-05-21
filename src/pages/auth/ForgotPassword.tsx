import { Box, Typography, TextField, Button, Link, Alert } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Link as RouterLink } from "react-router-dom";
import { AuthCard } from "../../components/AuthCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import LanguageSelector from "../../components/LanguageSelector";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const schema = yup.object({
    email: yup
      .string()
      .email(t("forgot.invalidEmail"))
      .required(t("forgot.required")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  function onSubmit() {
    setLoading(true);
    setSuccess(null);
    setTimeout(() => {
      setLoading(false);
      setSuccess(t("forgot.mockSuccess"));
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
      <Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 1 }}>
        <LanguageSelector />
      </Box>
      <AuthCard>
        <LockResetIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          {t("forgot.title")}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: "text.secondary", textAlign: "center" }}
        >
          {t("forgot.info")}
        </Typography>
        {success && (
          <Alert severity="success" sx={{ width: "100%", mb: 2 }}>
            {success}
          </Alert>
        )}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            label={t("forgot.email")}
            fullWidth
            sx={{ mb: 3 }}
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message as string}
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
            {loading ? t("forgot.submit") + "..." : t("forgot.submit")}
          </Button>
        </form>
        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          variant="body2"
        >
          {t("forgot.back")}
        </Link>
      </AuthCard>
    </Box>
  );
}
