import { Snackbar, Alert } from "@mui/material";
import React from "react";

type ToastNotificationProps = {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: "success" | "error";
};

const ToastNotification = ({
  open,
  onClose,
  message,
  severity,
}: ToastNotificationProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: 3,
          boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.18)",
          background:
            severity === "success"
              ? "linear-gradient(90deg, #e0ffe7 0%, #f4fff9 100%)"
              : "linear-gradient(90deg, #ffe0e0 0%, #fff4f4 100%)",
          backdropFilter: "blur(8px)",
          border:
            severity === "success"
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
        onClose={onClose}
        severity={severity}
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
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
