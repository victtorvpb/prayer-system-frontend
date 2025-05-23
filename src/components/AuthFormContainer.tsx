import {
  Box,
  Typography,
  Container,
  Alert,
  Snackbar,
  Button,
  Link,
  Paper,
} from "@mui/material";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";

interface AuthFormContainerProps {
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  isLoading?: boolean;
  showSuccess?: boolean;
  onCloseSuccess?: () => void;
  successMessage?: string;
  submitButtonText?: string;
  linkText?: string;
  linkHref?: string;
  error?: string;
  icon?: ReactNode;
  description?: string;
}

export default function AuthFormContainer({
  title,
  children,
  onSubmit,
  isLoading = false,
  showSuccess = false,
  onCloseSuccess,
  successMessage,
  submitButtonText,
  linkText,
  linkHref,
  error,
  icon,
  description,
}: AuthFormContainerProps) {
  const { t } = useTranslation();

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

      {/* Seletor de idioma */}
      <Box sx={{ position: "absolute", top: 24, right: 24, zIndex: 2 }}>
        <LanguageSelector />
      </Box>

      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 3,
            }}
          >
            {icon}
            <Typography
              variant="h5"
              sx={{
                mb: description ? 1 : 2,
                fontWeight: 700,
                letterSpacing: 0.5,
              }}
            >
              {title}
            </Typography>
            {description && (
              <Typography
                variant="body2"
                sx={{ mb: 3, color: "text.secondary", textAlign: "center" }}
              >
                {description}
              </Typography>
            )}
          </Box>

          <form onSubmit={onSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {children}

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mt: 1,
                    borderRadius: 1,
                    "& .MuiAlert-icon": {
                      color: "error.main",
                    },
                  }}
                >
                  {error}
                </Alert>
              )}

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    letterSpacing: 0.5,
                    boxShadow: "0 4px 12px rgba(25, 118, 210, 0.2)",
                    "&:hover": {
                      boxShadow: "0 6px 16px rgba(25, 118, 210, 0.3)",
                    },
                  }}
                >
                  {isLoading
                    ? t("common.loading")
                    : submitButtonText || t("auth.submit")}
                </Button>

                {linkText && linkHref && (
                  <Link
                    href={linkHref}
                    variant="body2"
                    sx={{
                      textAlign: "center",
                      textDecoration: "none",
                      color: "primary.main",
                      fontWeight: 500,
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {linkText}
                  </Link>
                )}
              </Box>
            </Box>
          </form>
        </Paper>
      </Container>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={onCloseSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          onClose={onCloseSuccess}
          sx={{
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(46, 125, 50, 0.15)",
            "& .MuiAlert-icon": {
              color: "success.main",
            },
          }}
        >
          {successMessage || t("auth.loginSuccess")}
        </Alert>
      </Snackbar>
    </Box>
  );
}
