import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PrayerPointForm from "./components/PrayerPointForm";
import { yupResolver } from "@hookform/resolvers/yup";
import FormLayout from "../../../components/FormLayout";
import { createPrayerPointSchema } from "../../../validations/schemas";
import type { PrayerPointFormData } from "./types";

export default function CreatePrayerPoint() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PrayerPointFormData>({
    resolver: yupResolver(createPrayerPointSchema),
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
    <FormLayout
      title={t("prayerPoints.createPrayerPoint")}
      onSubmit={handleSubmit(onSubmit)}
      cancelPath="/admin/prayer-points"
    >
      <PrayerPointForm control={control} errors={errors} />
    </FormLayout>
  );
}
