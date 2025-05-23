import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  useTheme,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./LanguageSelector";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

interface NavItem {
  label: string;
  href?: string;
  children?: Array<NavItem>;
}

const NAV_ITEMS: Array<NavItem> = [{ label: "nav.home", href: "/" }];

// Simulação de rota ativa (em produção, use React Router)
const getActiveRoute = () => window.location.pathname;

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const { t } = useTranslation();
  const drawerWidth = 240;

  // Adicionando as rotas administrativas
  const ADMIN_ITEMS = [
    {
      text: t("admin.registerUser"),
      icon: <PersonAddIcon />,
      path: "/register-user",
    },
    {
      text: t("admin.prayerPoints"),
      icon: <FormatListBulletedIcon />,
      path: "/prayer-points",
    },
  ];

  // Estado do menu de perfil
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleToggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const activeRoute = getActiveRoute();

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    navigate("/login");
  };

  // Novo: Verifica se o usuário é admin
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const drawer = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
      }}
    >
      <Box
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "primary.main",
            fontWeight: 700,
            fontSize: "1.3rem",
            letterSpacing: 1,
          }}
        >
          {t("nav.menu")}
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <List sx={{ flexGrow: 1 }}>
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <Box key={item.label}>
              <ListItemButton
                onClick={() => handleToggleSubmenu(item.label)}
                sx={{
                  borderRadius: 2,
                  mx: 1,
                  mb: 0.5,
                  color: "text.primary",
                  fontWeight: 500,
                  transition: "background 0.2s",
                  justifyContent: "flex-start",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText primary={t(item.label)} />
                {openSubmenu === item.label ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </ListItemButton>
              <Collapse
                in={openSubmenu === item.label}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItemButton
                      key={child.label}
                      component={Link}
                      to={child.href || "#"}
                      sx={{
                        pl: 5,
                        borderRadius: 2,
                        mx: 1,
                        mb: 0.5,
                        color:
                          activeRoute === child.href
                            ? "primary.main"
                            : "text.primary",
                        backgroundColor:
                          activeRoute === child.href
                            ? theme.palette.action.selected
                            : "transparent",
                        fontWeight: activeRoute === child.href ? 700 : 500,
                        transition: "background 0.2s",
                        "&:hover": {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemText primary={t(child.label)} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.href || "#"}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                color:
                  activeRoute === item.href ? "primary.main" : "text.primary",
                backgroundColor:
                  activeRoute === item.href
                    ? theme.palette.action.selected
                    : "transparent",
                fontWeight: activeRoute === item.href ? 700 : 500,
                transition: "background 0.2s",
                justifyContent: "flex-start",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemText primary={t(item.label)} />
            </ListItemButton>
          )
        )}
        {/* Nova seção Admin visível apenas para role admin */}
        {isAdmin && (
          <Box>
            <ListItemButton
              onClick={() => handleToggleSubmenu("admin")}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                color: "text.primary",
                fontWeight: 500,
                transition: "background 0.2s",
                justifyContent: "flex-start",
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemText primary={t("nav.admin")} />
              {openSubmenu === "admin" ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )}
            </ListItemButton>
            <Collapse in={openSubmenu === "admin"} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {ADMIN_ITEMS.map((item) => (
                  <ListItemButton
                    key={item.text}
                    component={Link}
                    to={item.path || "#"}
                    sx={{
                      pl: 5,
                      borderRadius: 2,
                      mx: 1,
                      mb: 0.5,
                      color:
                        activeRoute === item.path
                          ? "primary.main"
                          : "text.primary",
                      backgroundColor:
                        activeRoute === item.path
                          ? theme.palette.action.selected
                          : "transparent",
                      fontWeight: activeRoute === item.path ? 700 : 500,
                      transition: "background 0.2s",
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        )}
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* Drawer lateral */}
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
        aria-label="menu lateral"
      >
        {/* Drawer permanente para desktop */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              borderRight: isMobile
                ? "none"
                : `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Conteúdo principal */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* AppBar superior */}
        <AppBar
          position="fixed"
          color="inherit"
          elevation={0}
          sx={{
            zIndex: theme.zIndex.drawer + 1,
            boxShadow: "0 4px 24px rgba(25, 118, 210, 0.08)",
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Toolbar sx={{ minHeight: 64, px: { xs: 2, md: 4 } }}>
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                color="primary"
                edge="start"
                sx={{ mr: 2 }}
                aria-label="abrir menu"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                color: "primary.main",
                fontWeight: 700,
                letterSpacing: 1,
                fontSize: { xs: "1.1rem", md: "1.3rem" },
              }}
            >
              {t("app.title")}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LanguageSelector />
              <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 1 }}>
                <Avatar
                  sx={{
                    bgcolor: "primary.main",
                    width: 36,
                    height: 36,
                    border: `2px solid ${theme.palette.background.paper}`,
                  }}
                >
                  <AccountCircleIcon fontSize="medium" />
                </Avatar>
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>
                {t("profile.title")}
              </MenuItem>
              <MenuItem onClick={handleLogout}>{t("auth.logout")}</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        {/* Espaço para AppBar */}
        <Toolbar sx={{ minHeight: 64 }} />
        {/* Conteúdo renderizado */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 4 },
            bgcolor: "background.default",
            borderRadius: 3,
            boxShadow: { xs: 0, md: "0 2px 8px rgba(0,0,0,0.04)" },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
