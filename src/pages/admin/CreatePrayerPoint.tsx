import {
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import FormContainer from "../../components/FormContainer";
import { useNavigate } from "react-router-dom";

interface PrayerPointForm {
  category: string;
  prayerPoint: string;
  biblicalBase: string;
  isActive: boolean;
}

const MAX_PRAYER_POINT_LENGTH = 300;

// Mock data para categorias - substitua por dados reais da sua API
const categories = [
  "1LUV",
  "4VENTOS",
  "AKACHI",
  "BIBLE RUSH",
  "DSM",
  "FABRIC",
  "FACULDADE DUNAMIS",
  "FARM/HANGAR",
  "GREENHOUSE",
  "MUSIC",
  "POCKETS",
].sort((a, b) => a.localeCompare(b));

export default function CreatePrayerPoint() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    category: yup.string().required(t("prayerPoints.categoryRequired")),
    prayerPoint: yup
      .string()
      .required(t("prayerPoints.prayerPointRequired"))
      .max(MAX_PRAYER_POINT_LENGTH, t("prayerPoints.prayerPointMaxLength")),
    biblicalBase: yup.string().required(t("prayerPoints.biblicalBaseRequired")),
    isActive: yup.boolean().required(),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PrayerPointForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      isActive: true,
    },
  });

  const prayerPointLength = watch("prayerPoint")?.length || 0;
  const remainingChars = MAX_PRAYER_POINT_LENGTH - prayerPointLength;

  const onSubmit: SubmitHandler<PrayerPointForm> = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
      // Aqui você pode enviar os dados para a API
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/prayer-points");
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer
      title={t("prayerPoints.create")}
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isLoading}
      showSuccess={showSuccess}
      onCloseSuccess={() => setShowSuccess(false)}
      successMessage={t("prayerPoints.saveSuccess")}
    >
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth size="small" error={!!errors.category}>
            <InputLabel>{t("prayerPoints.category")}</InputLabel>
            <Select
              {...field}
              label={t("prayerPoints.category")}
              inputProps={{
                "aria-label": t("prayerPoints.category"),
              }}
            >
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="prayerPoint"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("prayerPoints.prayerPoint")}
            multiline
            rows={4}
            error={!!errors.prayerPoint}
            helperText={
              errors.prayerPoint?.message ||
              t("prayerPoints.remainingChars", { count: remainingChars })
            }
            inputProps={{
              maxLength: MAX_PRAYER_POINT_LENGTH,
              "aria-label": t("prayerPoints.prayerPoint"),
            }}
            size="small"
          />
        )}
      />

      <Controller
        name="biblicalBase"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("prayerPoints.biblicalBase")}
            placeholder="Ex: João 3:16"
            error={!!errors.biblicalBase}
            helperText={errors.biblicalBase?.message}
            inputProps={{
              "aria-label": t("prayerPoints.biblicalBase"),
            }}
            size="small"
          />
        )}
      />

      <Controller
        name="isActive"
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
                  "aria-label": t("prayerPoints.isActive"),
                }}
              />
            }
            label={
              field.value
                ? t("prayerPoints.active")
                : t("prayerPoints.inactive")
            }
          />
        )}
      />
    </FormContainer>
  );
}
