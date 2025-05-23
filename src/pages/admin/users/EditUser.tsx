import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Typography, Box } from "@mui/material";
import UserForm from "./components/UserForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface UserFormData {
  nome: string;
  email: string;
  senha?: string;
  confirmarSenha?: string;
  role: "admin" | "user";
  ativo: boolean;
}

const schema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  role: yup
    .mixed<"admin" | "user">()
    .oneOf(["admin", "user"])
    .required("Perfil é obrigatório"),
  ativo: yup.boolean().required(),
}) as yup.ObjectSchema<UserFormData>;

// Mock data - substituir por chamada à API
const mockUser = {
  id: "1",
  nome: "João Silva",
  email: "joao@example.com",
  role: "user" as const,
  ativo: true,
};

export default function EditUser() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      nome: mockUser.nome,
      email: mockUser.email,
      role: mockUser.role,
      ativo: mockUser.ativo,
    },
  });

  const onSubmit = (data: UserFormData) => {
    console.log(data);
    // TODO: Implementar chamada à API
    navigate("/admin/users");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t("register.editUser")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <UserForm control={control} errors={errors} isEdit />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/admin/users")}
                aria-label={t("common.cancel")}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                variant="contained"
                aria-label={t("common.save")}
              >
                {t("common.save")}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
