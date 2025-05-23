import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Alert,
  Snackbar,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthCard } from "../../components/ui/AuthCard";
import LanguageSelector from "../../components/ui/LanguageSelector";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("forgot.invalidEmail"))
      .required(t("forgot.required")),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = (data) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: t("forgot.mockSuccess"),
        severity: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }, 1200);
  };

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
        <LockResetIcon sx={{ fontSize: 52, color: "primary.main", mb: 1 }} />
        <Typography
          variant="h5"
          sx={{ mb: 2, fontWeight: 700, letterSpacing: 0.5 }}
        >
          {t("forgot.title")}
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: "text.secondary", textAlign: "center" }}
        >
          {t("forgot.info")}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("forgot.email")}
                fullWidth
                sx={{ mb: 2 }}
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
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
          <Box sx={{ textAlign: "center" }}>
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              variant="body2"
            >
              {t("forgot.back")}
            </Link>
          </Box>
        </form>
      </AuthCard>
    </Box>
  );
}
