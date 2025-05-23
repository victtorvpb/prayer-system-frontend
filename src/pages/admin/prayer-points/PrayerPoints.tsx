import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../components/DataTable";
import type { Column } from "../../../components/DataTable";
import { Chip } from "@mui/material";

interface PrayerPoint {
  id: string;
  category: string;
  prayerPoint: string;
  biblicalBase: string;
  active: boolean;
}

// Mock data - substituir por chamada à API
const mockPrayerPoints: PrayerPoint[] = [
  {
    id: "1",
    category: "Família",
    prayerPoint: "Oração pela união familiar",
    biblicalBase: "Salmos 133:1",
    active: true,
  },
  {
    id: "2",
    category: "Igreja",
    prayerPoint: "Oração pela unidade da igreja",
    biblicalBase: "João 17:21",
    active: true,
  },
];

export default function PrayerPoints() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const columns: Column<PrayerPoint>[] = [
    { field: "category", headerName: t("prayerPoints.category") },
    { field: "prayerPoint", headerName: t("prayerPoints.prayerPoint") },
    { field: "biblicalBase", headerName: t("prayerPoints.biblicalBase") },
    {
      field: "active",
      headerName: t("prayerPoints.active"),
      renderCell: (row) => (
        <Chip
          label={row.active ? t("common.yes") : t("common.no")}
          color={row.active ? "success" : "error"}
          size="small"
        />
      ),
    },
  ];

  const handleEdit = (prayerPoint: PrayerPoint) => {
    navigate(`/prayer-points/edit/${prayerPoint.id}`);
  };

  const handleDelete = (prayerPoint: PrayerPoint) => {
    console.log("Delete prayer point:", prayerPoint);
    // TODO: Implementar chamada à API
  };

  const handleCreate = () => {
    navigate("/prayer-points/create");
  };

  return (
    <DataTable
      title={t("prayerPoints.title")}
      columns={columns}
      data={mockPrayerPoints}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
    />
  );
}
