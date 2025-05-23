import {
  Autocomplete,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import FormContainer from "../../components/FormContainer";

interface PrayerPointForm {
  category: string;
  description: string;
  bibleReference: string;
  isActive: boolean;
}

const CATEGORIES = [
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
].sort();

const MAX_DESCRIPTION_LENGTH = 200;

export default function PrayerPoints() {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const schema = yup.object().shape({
    category: yup.string().required(t("prayerPoints.categoryRequired")),
    description: yup
      .string()
      .required(t("prayerPoints.descriptionRequired"))
      .max(MAX_DESCRIPTION_LENGTH, t("prayerPoints.descriptionMaxLength")),
    bibleReference: yup
      .string()
      .required(t("prayerPoints.bibleReferenceRequired")),
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

  const descriptionLength = watch("description")?.length || 0;
  const remainingChars = MAX_DESCRIPTION_LENGTH - descriptionLength;

  const onSubmit: SubmitHandler<PrayerPointForm> = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
      // Aqui você pode enviar os dados para a API
      setShowSuccess(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer
      title={t("admin.prayerPoints")}
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
          <Autocomplete
            {...field}
            options={CATEGORIES}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("prayerPoints.category")}
                error={!!errors.category}
                helperText={errors.category?.message}
                size="small"
                inputProps={{
                  ...params.inputProps,
                  "aria-label": t("prayerPoints.category"),
                }}
              />
            )}
            onChange={(_, value) => field.onChange(value)}
          />
        )}
      />

      <Controller
        name="bibleReference"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("prayerPoints.bibleReference")}
            error={!!errors.bibleReference}
            helperText={errors.bibleReference?.message}
            placeholder={t("prayerPoints.bibleReferencePlaceholder")}
            size="small"
            inputProps={{
              "aria-label": t("prayerPoints.bibleReference"),
            }}
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={t("prayerPoints.description")}
            multiline
            rows={3}
            error={!!errors.description}
            helperText={
              errors.description?.message ||
              t("prayerPoints.remainingChars", { count: remainingChars })
            }
            inputProps={{
              maxLength: MAX_DESCRIPTION_LENGTH,
              "aria-label": t("prayerPoints.description"),
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
