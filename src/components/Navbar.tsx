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
  useMediaQuery,
  Divider,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

interface NavItem {
  label: string;
  href?: string;
  children?: Array<NavItem>;
}

const NAV_ITEMS: Array<NavItem> = [
  { label: "Início", href: "/" },
  { label: "Orações", href: "/oracoes" },
  {
    label: "Comunidade",
    children: [
      { label: "Grupos de Oração", href: "/grupos" },
      { label: "Eventos", href: "/eventos" },
    ],
  },
  { label: "Sobre", href: "/sobre" },
];

const drawerWidth = 240;

// Simulação de rota ativa (em produção, use React Router)
const getActiveRoute = () => window.location.pathname;

export default function Navbar({ children }: { children?: React.ReactNode }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

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
          justifyContent: "center",
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
          Sistema de Oração
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
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <ListItemText primary={item.label} />
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
                      to={child.href}
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
                      <ListItemText primary={child.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.href}
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
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          )
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
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="menu lateral"
      >
        {/* Drawer mobile */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        {/* Drawer fixo desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Conteúdo principal */}
      <Box
        sx={{
          flexGrow: 1,
          ml: { md: `${drawerWidth}px` },
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
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <Toolbar sx={{ minHeight: 64 }}>
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                color="primary"
                edge="start"
                sx={{ mr: 2 }}
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
              }}
            >
              Sistema de Oração
            </Typography>
            {/* Ícone de perfil */}
            <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 2 }}>
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
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>Perfil</MenuItem>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
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
