import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UserForm from "./components/UserForm";
import { yupResolver } from "@hookform/resolvers/yup";
import FormLayout from "../../../components/FormLayout";
import { editUserSchema } from "../../../validations/schemas";
import type { User, UserFormData } from "../../../types";

// Mock data - substituir por chamada à API
const mockUser: User = {
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
    resolver: yupResolver(editUserSchema),
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
    <FormLayout
      title={t("register.editUser")}
      onSubmit={handleSubmit(onSubmit)}
      cancelPath="/admin/users"
    >
      <UserForm control={control} errors={errors} isEdit />
    </FormLayout>
  );
}
