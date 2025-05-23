import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Typography, Box } from "@mui/material";
import PrayerPointForm from "./components/PrayerPointForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface PrayerPointFormData {
  category: string;
  prayerPoint: string;
  biblicalBase: string;
  active: boolean;
}

const schema = yup.object().shape({
  category: yup.string().required("Categoria é obrigatória"),
  prayerPoint: yup
    .string()
    .required("Pauta de oração é obrigatória")
    .max(300, "A pauta de oração deve ter no máximo 300 caracteres"),
  biblicalBase: yup.string().required("Base bíblica é obrigatória"),
  active: yup.boolean().required(),
}) as yup.ObjectSchema<PrayerPointFormData>;

export default function CreatePrayerPoint() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PrayerPointFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      category: "",
      prayerPoint: "",
      biblicalBase: "",
      active: true,
    },
  });

  const onSubmit = (data: PrayerPointFormData) => {
    console.log(data);
    // TODO: Implementar chamada à API
    navigate("/admin/prayer-points");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          {t("prayerPoints.createPrayerPoint")}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <PrayerPointForm control={control} errors={errors} />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/admin/prayer-points")}
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
