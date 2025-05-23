import {
  Box,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

interface CadastrarUsuarioForm {
  nome: string;
  email: string;
  role: "admin" | "user";
  ativo: boolean;
}

export default function CadastrarUsuario() {
  const { t } = useTranslation();
  const schema = yup.object({
    nome: yup.string().required(t("register.nameRequired")),
    email: yup
      .string()
      .email(t("register.invalidEmail"))
      .required(t("register.emailRequired")),
    role: yup
      .string()
      .oneOf(["admin", "user"])
      .required(t("register.roleRequired")),
    ativo: yup.boolean().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastrarUsuarioForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "user",
      ativo: true,
    },
  });

  function onSubmit(data: CadastrarUsuarioForm) {
    console.log(data);
    // Aqui você pode enviar os dados para a API
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {t("register.title")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
        <TextField
          label={t("register.name")}
          fullWidth
          sx={{ mb: 2 }}
          {...register("nome")}
          error={!!errors.nome}
          helperText={errors.nome?.message}
        />
        <TextField
          label={t("register.email")}
          fullWidth
          sx={{ mb: 2 }}
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>{t("register.role")}</InputLabel>
          <Select
            label={t("register.role")}
            {...register("role")}
            error={!!errors.role}
          >
            <MenuItem value="admin">{t("register.admin")}</MenuItem>
            <MenuItem value="user">{t("register.user")}</MenuItem>
          </Select>
        </FormControl>
        <FormControlLabel
          control={<Switch {...register("ativo")} />}
          label={t("register.active")}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {t("register.submit")}
        </Button>
      </form>
    </Box>
  );
}
