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
import type { PrayerPointFormData } from "../types";

interface PrayerPointFormProps {
  control: Control<PrayerPointFormData>;
  errors: FieldErrors<PrayerPointFormData>;
}

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

export default function PrayerPointForm({
  control,
  errors,
}: PrayerPointFormProps) {
  const { t } = useTranslation();

  return (
    <>
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
            error={!!errors.prayerPoint}
            helperText={errors.prayerPoint?.message}
            size="small"
            multiline
            rows={4}
            inputProps={{
              "aria-label": t("prayerPoints.prayerPoint"),
              maxLength: 300,
            }}
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
            error={!!errors.biblicalBase}
            helperText={errors.biblicalBase?.message}
            size="small"
            multiline
            rows={4}
            inputProps={{
              "aria-label": t("prayerPoints.biblicalBase"),
            }}
          />
        )}
      />

      <Controller
        name="active"
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
                  "aria-label": t("prayerPoints.active"),
                }}
              />
            }
            label={t("prayerPoints.active")}
          />
        )}
      />
    </>
  );
}
