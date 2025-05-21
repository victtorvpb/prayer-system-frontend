import { Box, Button, Typography } from "@mui/material";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Box>
      <Navbar />
      <Box component="main" sx={{ p: 4 }}>
        <Typography color="primary">Olá Material UI!</Typography>
        <Button variant="contained" sx={{ mt: 4 }}>
          Botão Padrão
        </Button>
      </Box>
    </Box>
  );
}

export default App;
