import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";
import "./i18n";
import { AuthProvider } from "./hooks/useAuth";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </I18nextProvider>
  </React.StrictMode>
);
