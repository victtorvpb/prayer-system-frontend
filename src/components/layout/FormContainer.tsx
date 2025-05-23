import {
  Box,
  Typography,
  Container,
  Alert,
  Snackbar,
  Button,
} from "@mui/material";
import type { ReactNode } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useTranslation } from "react-i18next";

interface FormContainerProps {
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  isLoading?: boolean;
  showSuccess?: boolean;
  onCloseSuccess?: () => void;
  successMessage?: string;
  submitButtonText?: string;
}

export default function FormContainer({
  title,
  children,
  onSubmit,
  isLoading = false,
  showSuccess = false,
  onCloseSuccess,
  successMessage,
  submitButtonText,
}: FormContainerProps) {
  const { t } = useTranslation();

  return (
    <Container maxWidth="sm" sx={{ py: 2 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 500 }}>
        {title}
      </Typography>

      <form onSubmit={onSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {children}

          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              startIcon={<SaveIcon />}
              disabled={isLoading}
            >
              {submitButtonText || t("common.save")}
            </Button>
          </Box>
        </Box>
      </form>

      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={onCloseSuccess}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={onCloseSuccess}>
          {successMessage || t("common.saveSuccess")}
        </Alert>
      </Snackbar>
    </Container>
  );
}
