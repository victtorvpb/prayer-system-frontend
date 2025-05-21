import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      contrastText: "#fff"
    },
    secondary: {
      main: "#ff9800",
      contrastText: "#fff"
    },
    background: {
      default: "#f4f6fa",
      paper: "#fff"
    },
    text: {
      primary: "#222",
      secondary: "#555"
    }
  },
  shape: {
    borderRadius: 16
  },
  typography: {
    fontFamily: "Inter, Roboto, Arial, sans-serif",
    h5: {
      fontWeight: 700,
      letterSpacing: 0.5
    },
    button: {
      textTransform: "none",
      fontWeight: 600
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
          paddingTop: 12,
          paddingBottom: 12,
          fontWeight: 600,
          fontSize: 16
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: "#fff"
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(25, 118, 210, 0.08)"
        }
      }
    }
  }
}); 
