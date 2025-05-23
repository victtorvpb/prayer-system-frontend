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

interface PrayerPoint {
  id: number;
  category: string;
  prayerPoint: string;
  biblicalBase: string;
  isActive: boolean;
}

// Mock data - substitua por dados reais da sua API
const mockPrayerPoints: PrayerPoint[] = [
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

export default function PrayerPoints() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<PrayerPoint | null>(null);

  const handleAddNew = () => {
    navigate("/prayer-points/create");
  };

  const handleEdit = (id: number) => {
    navigate(`/prayer-points/edit/${id}`);
  };

  const handleDeleteClick = (point: PrayerPoint) => {
    setSelectedPoint(point);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedPoint) {
      // Aqui você pode implementar a chamada à API para excluir o ponto de oração
      console.log("Excluindo ponto de oração:", selectedPoint.id);
      // Após a exclusão bem-sucedida, você pode atualizar a lista
      setDeleteDialogOpen(false);
      setSelectedPoint(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setSelectedPoint(null);
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
          {t("prayerPoints.title")}
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
          {t("prayerPoints.addNew")}
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
                {t("prayerPoints.category")}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>
                {t("prayerPoints.prayerPoint")}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>
                {t("prayerPoints.biblicalBase")}
              </TableCell>
              <TableCell sx={{ fontWeight: 600, py: 2 }}>
                {t("prayerPoints.status")}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600, py: 2 }}>
                {t("common.actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockPrayerPoints.map((point) => (
              <TableRow
                key={point.id}
                sx={{
                  "&:hover": {
                    backgroundColor: theme.palette.grey[50],
                    transition: "background-color 0.2s",
                  },
                }}
              >
                <TableCell sx={{ py: 2 }}>
                  <Chip
                    label={point.category}
                    color="primary"
                    size="small"
                    sx={{
                      fontWeight: 500,
                      borderRadius: 1,
                      px: 1,
                    }}
                  />
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography
                    sx={{
                      maxWidth: 400,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {point.prayerPoint}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Typography
                    color="text.secondary"
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {point.biblicalBase}
                  </Typography>
                </TableCell>
                <TableCell sx={{ py: 2 }}>
                  <Chip
                    label={
                      point.isActive ? t("common.active") : t("common.inactive")
                    }
                    color={point.isActive ? "success" : "default"}
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
                      onClick={() => handleEdit(point.id)}
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
                      onClick={() => handleDeleteClick(point)}
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
        <DialogTitle>{t("prayerPoints.deleteConfirmTitle")}</DialogTitle>
        <DialogContent>
          <Typography>
            {t("prayerPoints.deleteConfirmMessage", {
              category: selectedPoint?.category,
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
