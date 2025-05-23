import {
  TextField,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { UserFormData } from "../types";

interface UserFormProps {
  control: Control<UserFormData>;
  errors: FieldErrors<UserFormData>;
  isEdit?: boolean;
}

export default function UserForm({
  control,
  errors,
  isEdit = false,
}: UserFormProps) {
  const { t } = useTranslation();

  return (
    <>
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

      {!isEdit && (
        <>
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
        </>
      )}

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
    </>
  );
}
