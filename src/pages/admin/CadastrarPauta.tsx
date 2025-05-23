import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export default function RegisterAgenda() {
  const { t } = useTranslation();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {t("admin.registerAgenda")}
      </Typography>
    </Box>
  );
}
