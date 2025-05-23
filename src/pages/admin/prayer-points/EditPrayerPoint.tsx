import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PrayerPointForm from "./components/PrayerPointForm";
import { yupResolver } from "@hookform/resolvers/yup";
import FormLayout from "../../../components/FormLayout";
import { createPrayerPointSchema } from "../../../validations/schemas";
import type { PrayerPoint, PrayerPointFormData } from "../../../types";

// Mock data - substituir por chamada à API
const mockPrayerPoint: PrayerPoint = {
  id: "1",
  category: "Família",
  prayerPoint: "Oração pela união familiar",
  biblicalBase: "Salmos 133:1",
  active: true,
};

export default function EditPrayerPoint() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PrayerPointFormData>({
    resolver: yupResolver(createPrayerPointSchema),
    defaultValues: {
      category: mockPrayerPoint.category,
      prayerPoint: mockPrayerPoint.prayerPoint,
      biblicalBase: mockPrayerPoint.biblicalBase,
      active: mockPrayerPoint.active,
    },
  });

  const onSubmit = (data: PrayerPointFormData) => {
    console.log(data);
    // TODO: Implementar chamada à API
    navigate("/admin/prayer-points");
  };

  return (
    <FormLayout
      title={t("prayerPoints.editPrayerPoint")}
      onSubmit={handleSubmit(onSubmit)}
      cancelPath="/admin/prayer-points"
    >
      <PrayerPointForm control={control} errors={errors} />
    </FormLayout>
  );
}
