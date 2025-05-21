import { Paper } from "@mui/material";
export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, sm: 5 },
        width: { xs: "100%", sm: 380 },
        maxWidth: "95vw",
        borderRadius: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px 0 rgba(25, 118, 210, 0.12)",
      }}
    >
      {children}
    </Paper>
  );
}
