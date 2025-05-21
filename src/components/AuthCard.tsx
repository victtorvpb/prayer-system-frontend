import { Paper } from "@mui/material";
export function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <Paper
      elevation={6}
      sx={{
        p: 5,
        width: 370,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        zIndex: 1,
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(8px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
      }}
    >
      {children}
    </Paper>
  );
}
