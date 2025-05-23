import {
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import FormContainer from "../../components/FormContainer";
import { useNavigate } from "react-router-dom";

interface CreateUserForm {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
  role: "admin" | "user";
  ativo: boolean;
}

export default function CreateUser() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object({
    nome: yup.string().required(t("register.nameRequired")),
    email: yup
      .string()
      .email(t("register.invalidEmail"))
      .required(t("register.emailRequired")),
    senha: yup
      .string()
      .required(t("register.passwordRequired"))
      .min(6, t("register.passwordMinLength")),
    confirmarSenha: yup
      .string()
      .required(t("register.confirmPasswordRequired"))
      .oneOf([yup.ref("senha")], t("register.passwordsMustMatch")),
    role: yup
      .string()
      .oneOf(["admin", "user"])
      .required(t("register.roleRequired")),
    ativo: yup.boolean().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "user",
      ativo: true,
    },
  });

  const onSubmit = async (data: CreateUserForm) => {
    setIsLoading(true);
    try {
      console.log("Cadastrando usuário:", data);
      // Aqui você pode enviar os dados para a API
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/register-user");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer
      title={t("register.title")}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      showSuccess={showSuccess}
      onCloseSuccess={() => setShowSuccess(false)}
      successMessage={t("register.success")}
    >
      <Controller
        name="nome"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("register.name")}
            error={!!errors.nome}
            helperText={errors.nome?.message}
            size="small"
            inputProps={{
              "aria-label": t("register.name"),
            }}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("register.email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            size="small"
            inputProps={{
              "aria-label": t("register.email"),
            }}
          />
        )}
      />

      <Controller
        name="senha"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label={t("register.password")}
            error={!!errors.senha}
            helperText={errors.senha?.message}
            size="small"
            inputProps={{
              "aria-label": t("register.password"),
            }}
          />
        )}
      />

      <Controller
        name="confirmarSenha"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="password"
            label={t("register.confirmPassword")}
            error={!!errors.confirmarSenha}
            helperText={errors.confirmarSenha?.message}
            size="small"
            inputProps={{
              "aria-label": t("register.confirmPassword"),
            }}
          />
        )}
      />

      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth size="small" error={!!errors.role}>
            <InputLabel>{t("register.role")}</InputLabel>
            <Select
              {...field}
              label={t("register.role")}
              inputProps={{
                "aria-label": t("register.role"),
              }}
            >
              <MenuItem value="admin">{t("register.admin")}</MenuItem>
              <MenuItem value="user">{t("register.user")}</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="ativo"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={
              <Switch
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                size="small"
                inputProps={{
                  "aria-label": t("register.active"),
                }}
              />
            }
            label={t("register.active")}
          />
        )}
      />
    </FormContainer>
  );
}
