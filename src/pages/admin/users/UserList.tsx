import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Chip } from "@mui/material";
import DataTable, { type Column } from "../../../components/DataTable";
import type { User } from "./types";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Mock data - substitua por dados reais da sua API
const mockUsers: User[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao@email.com",
    role: "admin",
    ativo: true,
  },
  {
    id: "2",
    nome: "Maria Santos",
    email: "maria@email.com",
    role: "user",
    ativo: true,
  },
  {
    id: "3",
    nome: "Pedro Oliveira",
    email: "pedro@email.com",
    role: "user",
    ativo: false,
  },
];

export default function UserList() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns: Column<User>[] = [
    { field: "nome", headerName: t("users.name") },
    { field: "email", headerName: t("users.email") },
    {
      field: "role",
      headerName: t("users.role"),
      renderCell: (row) => (
        <Chip
          label={t(`register.${row.role}`)}
          color={row.role === "admin" ? "primary" : "default"}
          size="small"
          sx={{
            fontWeight: 500,
            borderRadius: 1,
            px: 1,
          }}
        />
      ),
    },
    {
      field: "ativo",
      headerName: t("users.active"),
    },
  ];

  const handleEdit = (user: User) => {
    navigate(`/admin/users/${user.id}/edit`);
  };

  const handleDelete = (user: User) => {
    console.log("Delete user:", user);
    // TODO: Implementar chamada à API
  };

  const handleCreate = () => {
    navigate("/admin/users/create");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" component="h1">
          {t("users.title")}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
          aria-label={t("common.create")}
        >
          {t("common.create")}
        </Button>
      </Box>

      <DataTable
        title={t("users.title")}
        columns={columns}
        data={mockUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
      />
    </Box>
  );
}
