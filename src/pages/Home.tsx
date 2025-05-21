import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();
  return (
    <Box component="main" sx={{ p: 4 }}>
      <Typography color="primary" variant="h5" sx={{ mb: 3 }}>
        {t("home.welcome")}
      </Typography>
    </Box>
  );
}
