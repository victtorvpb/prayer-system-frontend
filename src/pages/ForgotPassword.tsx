import { Box, Typography, Paper, TextField, Button, Link } from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Link as RouterLink } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
});

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: any) {
    // Chame o serviço de recuperação aqui
    console.log(data);
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "#a1c4fd33",
          top: -80,
          left: -80,
          zIndex: 0,
          filter: "blur(2px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "#c2e9fb44",
          bottom: 40,
          right: 60,
          zIndex: 0,
          filter: "blur(2px)",
        }}
      />
      <AuthCard>
        <LockResetIcon sx={{ fontSize: 48, color: "primary.main", mb: 1 }} />
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Esqueci minha senha
        </Typography>
        <Typography
          variant="body2"
          sx={{ mb: 3, color: "text.secondary", textAlign: "center" }}
        >
          Informe seu e-mail para receber instruções de redefinição de senha.
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            label="E-mail"
            fullWidth
            sx={{ mb: 3 }}
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mb: 2 }}
          >
            Enviar instruções
          </Button>
        </form>
        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          variant="body2"
        >
          Voltar ao login
        </Link>
      </AuthCard>
    </Box>
  );
}
