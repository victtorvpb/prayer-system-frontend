import { Box, Button, Typography } from "@mui/material";
export default function Home() {
  return (
    <Box component="main" sx={{ p: 4 }}>
      <Typography color="primary">Olá Material UI!</Typography>
      <Button variant="contained" sx={{ mt: 4 }}>
        Botão Padrão
      </Button>
    </Box>
  );
}
