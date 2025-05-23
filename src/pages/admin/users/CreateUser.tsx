import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import UserForm from "./components/UserForm";
import { yupResolver } from "@hookform/resolvers/yup";
import FormLayout from "../../../components/FormLayout";
import { createUserSchema } from "../../../validations/schemas";
import type { UserFormData } from "./types";

export default function CreateUser() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: yupResolver(createUserSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmarSenha: "",
      role: "user",
      ativo: true,
    },
  });

  const onSubmit = (data: UserFormData) => {
    console.log(data);
    // TODO: Implementar chamada à API
    navigate("/admin/users");
  };

  return (
    <FormLayout
      title={t("register.createUser")}
      onSubmit={handleSubmit(onSubmit)}
      cancelPath="/admin/users"
    >
      <UserForm control={control} errors={errors} />
    </FormLayout>
  );
}
