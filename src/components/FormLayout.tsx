import { Box, Paper, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface FormLayoutProps {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  cancelPath: string;
}

export default function FormLayout({
  title,
  onSubmit,
  children,
  cancelPath,
}: FormLayoutProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {title}
        </Typography>

        <form onSubmit={onSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {children}

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => navigate(cancelPath)}
                aria-label={t("common.cancel")}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                aria-label={t("common.save")}
              >
                {t("common.save")}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
