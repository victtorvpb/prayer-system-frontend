import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink } from "react-router-dom";
import { AuthCard } from "../components/AuthCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  nome: yup.string().required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  senha: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Campo obrigatório"),
  confirmar: yup
    .string()
    .oneOf([yup.ref("senha")], "As senhas não coincidem")
    .required("Confirme a senha"),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: any) {
    // Chame o serviço de cadastro aqui
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
        <PersonAddAlt1Icon
          sx={{ fontSize: 48, color: "primary.main", mb: 1 }}
        />
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
          Criar conta
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            label="Nome"
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="name"
            {...register("nome")}
            error={!!errors.nome}
            helperText={errors.nome?.message as string}
          />
          <TextField
            label="E-mail"
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message as string}
          />
          <TextField
            label="Senha"
            type={showPassword ? "text" : "password"}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="new-password"
            {...register("senha")}
            error={!!errors.senha}
            helperText={errors.senha?.message as string}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Mostrar senha"
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirmar senha"
            type={showConfirm ? "text" : "password"}
            fullWidth
            sx={{ mb: 2 }}
            autoComplete="new-password"
            {...register("confirmar")}
            error={!!errors.confirmar}
            helperText={errors.confirmar?.message as string}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Mostrar senha"
                    onClick={() => setShowConfirm((s) => !s)}
                    edge="end"
                  >
                    {showConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mb: 2 }}
          >
            Cadastrar
          </Button>
        </form>
        <Typography variant="body2">
          Já tem uma conta?{" "}
          <Link component={RouterLink} to="/login" underline="hover">
            Voltar ao login
          </Link>
        </Typography>
      </AuthCard>
    </Box>
  );
}
