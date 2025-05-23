import {
  Box,
  Typography,
  FormControl,
  Autocomplete,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface PrayerPointForm {
  category: string;
  description: string;
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

  const schema = yup.object({
    category: yup.string().required(t("prayerPoints.categoryRequired")),
    description: yup
      .string()
      .required(t("prayerPoints.descriptionRequired"))
      .max(MAX_DESCRIPTION_LENGTH, t("prayerPoints.descriptionMaxLength")),
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PrayerPointForm>({
    resolver: yupResolver(schema),
  });

  const descriptionLength = watch("description")?.length || 0;
  const remainingChars = MAX_DESCRIPTION_LENGTH - descriptionLength;

  function onSubmit(data: PrayerPointForm) {
    console.log(data);
    // Aqui você pode enviar os dados para a API
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        {t("admin.prayerPoints")}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 600 }}>
        <FormControl fullWidth sx={{ mb: 2 }}>
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
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
              />
            )}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label={t("prayerPoints.description")}
                multiline
                rows={4}
                error={!!errors.description}
                helperText={
                  errors.description?.message ||
                  t("prayerPoints.remainingChars", { count: remainingChars })
                }
                inputProps={{
                  maxLength: MAX_DESCRIPTION_LENGTH,
                }}
              />
            )}
          />
        </FormControl>
      </form>
    </Box>
  );
}
