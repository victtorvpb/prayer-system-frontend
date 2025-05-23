import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Tooltip,
  useTheme,
  alpha,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface User {
  id: number;
  nome: string;
  email: string;
  role: "admin" | "user";
  ativo: boolean;
}

// Mock data - substitua por dados reais da sua API
const mockUsers: User[] = [
  {
    id: 1,
    nome: "João Silva",
    email: "joao@email.com",
    role: "admin" as const,
    ativo: true,
  },
  {
    id: 2,
    nome: "Maria Santos",
    email: "maria@email.com",
    role: "user" as const,
    ativo: true,
  },
  {
    id: 3,
    nome: "Pedro Oliveira",
    email: "pedro@email.com",
    role: "user" as const,
    ativo: false,
  },
];

export default function UserList() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAddNew = () => {
    navigate("/register-user/create");
  };

  const handleEdit = (id: number) => {
    navigate(`/register-user/edit/${id}`);
  };

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedUser) {
      // Aqui você pode implementar a chamada à API para excluir o usuário
      console.log("Excluindo usuário:", selectedUser.id);
      // Após a exclusão bem-sucedida, você pode atualizar a lista
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          px: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "primary.main",
            letterSpacing: "0.5px",
          }}
        >
          {t("register.title")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddNew}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            boxShadow: theme.shadows[2],
            "&:hover": {
              boxShadow: theme.shadows[4],
            },
          }}
        >
          {t("register.addNew")}
        </Button>
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: theme.shadows[2],
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.grey[50] }}>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>
                {t("register.name")}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>
                {t("register.email")}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>
                {t("register.role")}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>
                {t("register.status")}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, py: 2 }}>
                {t("common.actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.grey[50],
                    transition: "background-color 0.2s",
                  },
                }}
              >
                <TableCell sx={{ py: 2 }}>
                  <Typography sx={{ fontWeight: 500 }}>{user.nome}</Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography color="text.secondary">{user.email}</Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Chip
                    label={t(`register.${user.role}`)}
                    color={user.role === "admin" ? "primary" : "default"}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      borderRadius: 1,
                      px: 1,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Chip
                    label={
                      user.ativo ? t("common.active") : t("common.inactive")
                    }
                    color={user.ativo ? "success" : "default"}
                    size="small"
                    sx={{
                      fontWeight: 500,
                      borderRadius: 1,
                      px: 1,
                    }}
                  />
                </TableCell>
                <TableCell align="right" sx={{ py: 2 }}>
                  <Tooltip title={t("common.edit")}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEdit(user.id)}
                      sx={{
                        mr: 1,
                        "&:hover": {
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t("common.delete")}>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(user)}
                      sx={{
                        "&:hover": {
                          backgroundColor: alpha(theme.palette.error.main, 0.1),
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>{t("register.deleteConfirmTitle")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("register.deleteConfirmMessage", {
              name: selectedUser?.nome,
            })}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            {t("common.cancel")}
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            {t("common.delete")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
