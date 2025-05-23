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
import { useState, useEffect } from "react";
import FormContainer from "../../components/FormContainer";
import { useNavigate, useParams } from "react-router-dom";

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

// Mock data - substitua por dados reais da sua API
const mockPrayerPoints = [
  {
    id: 1,
    category: "1LUV",
    prayerPoint:
      "Oração pela unidade e comunhão entre os membros do 1LUV, para que possam crescer juntos em amor e propósito.",
    biblicalBase: "João 17:21",
    isActive: true,
  },
  {
    id: 2,
    category: "DSM",
    prayerPoint:
      "Oração pelo ministério de louvor, para que cada membro seja usado por Deus para levar adoração genuína.",
    biblicalBase: "1 Coríntios 12:12",
    isActive: true,
  },
  {
    id: 3,
    category: "FACULDADE DUNAMIS",
    prayerPoint:
      "Oração pelos alunos e professores, para que sejam capacitados e usados por Deus em suas áreas de atuação.",
    biblicalBase: "2 Timóteo 2:15",
    isActive: false,
  },
];

export default function EditPrayerPoint() {
  const navigate = useNavigate();
  const { id } = useParams();
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
    reset,
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

  useEffect(() => {
    // Simulando carregamento dos dados do ponto de oração
    const prayerPoint = mockPrayerPoints.find(
      (point) => point.id === Number(id)
    );
    if (prayerPoint) {
      reset({
        category: prayerPoint.category,
        prayerPoint: prayerPoint.prayerPoint,
        biblicalBase: prayerPoint.biblicalBase,
        isActive: prayerPoint.isActive,
      });
    } else {
      // Se não encontrar o ponto de oração, redireciona para a lista
      navigate("/prayer-points");
    }
  }, [id, reset, navigate]);

  const onSubmit: SubmitHandler<PrayerPointForm> = async (data) => {
    setIsLoading(true);
    try {
      console.log("Editando ponto de oração:", { id, ...data });
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
      title={t("prayerPoints.edit")}
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
