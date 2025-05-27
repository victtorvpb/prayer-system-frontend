import { Box, Typography, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          p: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, sm: 5 },
              borderRadius: 5,
              minWidth: 320,
              maxWidth: 420,
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.10)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              color="primary"
              variant="h5"
              sx={{ mb: 2, fontWeight: 700, letterSpacing: 0.5 }}
            >
              {t("home.welcome")}
            </Typography>
            {/* Adicione aqui mais conteúdo da Home se desejar */}
          </Paper>
        </Box>
      </Box>
    </>
  );
}
