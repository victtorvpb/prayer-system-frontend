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
import { useState, useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { useNavigate, useParams } from "react-router-dom";

interface EditUserForm {
  nome: string;
  email: string;
  role: "admin" | "user";
  ativo: boolean;
}

// Mock data - substitua por dados reais da sua API
const mockUsers = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    role: "admin" as const,
    ativo: true,
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    role: "user" as const,
    ativo: true,
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    email: "pedro@email.com",
    role: "user" as const,
    ativo: false,
  },
];

export default function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditUserForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      role: "user",
      ativo: true,
    },
  });

  useEffect(() => {
    // Simulando carregamento dos dados do usuário
    const user = mockUsers.find((u) => u.id === Number(id));
    if (user) {
      reset({
        nome: user.nome,
        email: user.email,
        role: user.role,
        ativo: user.ativo,
      });
    } else {
      // Se não encontrar o usuário, redireciona para a lista
      navigate("/register-user");
    }
  }, [id, reset, navigate]);

  const onSubmit = async (data: EditUserForm) => {
    setIsLoading(true);
    try {
      console.log("Editando usuário:", { id, ...data });
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
      title={t("register.edit")}
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
