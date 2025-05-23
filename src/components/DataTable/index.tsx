import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  Stack,
  Button,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useTranslation } from "react-i18next";

export interface Column<T> {
  field: keyof T;
  headerName: string;
  width?: number;
  renderCell?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onCreate?: () => void;
}

export default function DataTable<T extends { id: string }>({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  onCreate,
}: DataTableProps<T>) {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderMobileView = () => (
    <Stack spacing={1}>
      {data.map((row) => (
        <Card
          key={row.id}
          variant="outlined"
          sx={{ borderRadius: 2, overflow: "hidden" }}
        >
          <CardContent sx={{ p: 1.5 }}>
            {/* Título principal */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 1,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, flex: 1, mr: 1 }}
              >
                {String(row[columns[0].field])}
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {onEdit && (
                  <Tooltip title={t("common.edit") as string}>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(row)}
                      sx={{ color: theme.palette.primary.main, p: 0.5 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                {onDelete && (
                  <Tooltip title={t("common.delete") as string}>
                    <IconButton
                      size="small"
                      onClick={() => onDelete(row)}
                      sx={{ color: theme.palette.error.main, p: 0.5 }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
            {/* Demais campos em linhas separadas */}
            <Stack spacing={1}>
              {columns.slice(1).map((column) => {
                // Se for o campo de status/ativo, exibir como chip colorido
                if (
                  column.field === "active" ||
                  column.field === "ativo" ||
                  column.field === "status"
                ) {
                  const value = row[column.field];
                  return (
                    <Box
                      key={String(column.field)}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ minWidth: 60 }}
                      >
                        {column.headerName}
                      </Typography>
                      <Chip
                        label={
                          value === true
                            ? t("common.yes")
                            : value === false
                              ? t("common.no")
                              : String(value)
                        }
                        color={
                          value === true ||
                          String(value).toLowerCase() ===
                            t("common.yes").toLowerCase()
                            ? "success"
                            : "default"
                        }
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>
                  );
                }
                // Demais campos
                return (
                  <Box key={String(column.field)}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ fontWeight: 500 }}
                    >
                      {column.headerName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.primary", fontWeight: 400 }}
                    >
                      {column.renderCell
                        ? column.renderCell(row)
                        : String(row[column.field])}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );

  const renderDesktopView = () => (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.field)}
                style={{ width: column.width }}
                sx={{
                  backgroundColor: theme.palette.background.default,
                  fontWeight: 600,
                }}
              >
                {column.headerName}
              </TableCell>
            ))}
            {(onEdit || onDelete) && (
              <TableCell
                align="right"
                sx={{
                  backgroundColor: theme.palette.background.default,
                  fontWeight: 600,
                }}
              >
                {t("common.actions")}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:hover": { backgroundColor: theme.palette.action.hover },
              }}
            >
              {columns.map((column) => (
                <TableCell key={String(column.field)}>
                  {column.renderCell
                    ? column.renderCell(row)
                    : String(row[column.field])}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell align="right">
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                  >
                    {onEdit && (
                      <Tooltip title={t("common.edit") as string}>
                        <IconButton
                          color="primary"
                          onClick={() => onEdit(row)}
                          aria-label={t("common.edit") as string}
                          size="small"
                          sx={{
                            bgcolor: theme.palette.primary.light,
                            color: theme.palette.primary.main,
                            "&:hover": {
                              bgcolor: theme.palette.primary.main,
                              color: theme.palette.primary.contrastText,
                            },
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip title={t("common.delete") as string}>
                        <IconButton
                          color="error"
                          onClick={() => onDelete(row)}
                          aria-label={t("common.delete") as string}
                          size="small"
                          sx={{
                            bgcolor: theme.palette.error.light,
                            color: theme.palette.error.main,
                            "&:hover": {
                              bgcolor: theme.palette.error.main,
                              color: theme.palette.error.contrastText,
                            },
                          }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ width: "100%", p: { xs: 0, sm: 1, md: 2 } }}>
      <Paper
        sx={{
          width: "100%",
          p: { xs: 1, sm: 2 },
          borderRadius: 2,
          boxShadow: theme.shadows[1],
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: { xs: 1.5, sm: 2 },
          }}
        >
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{ fontWeight: 600, color: theme.palette.text.primary }}
          >
            {title}
          </Typography>
          {onCreate && (
            <Tooltip title={t("common.create") as string}>
              <Button
                variant="contained"
                onClick={onCreate}
                startIcon={<AddIcon />}
                size={isMobile ? "small" : "medium"}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  boxShadow: theme.shadows[1],
                  "&:hover": { boxShadow: theme.shadows[2] },
                }}
              >
                {t("common.create")}
              </Button>
            </Tooltip>
          )}
        </Box>
        {isMobile ? renderMobileView() : renderDesktopView()}
      </Paper>
    </Box>
  );
}
