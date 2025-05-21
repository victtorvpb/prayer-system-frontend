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

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: 700, fontSize: "1.3rem" }}
        >
          Sistema de Oração
        </Typography>
      </Box>
      <Divider />
      <List sx={{ flexGrow: 1 }}>
        {NAV_ITEMS.map((item) =>
          item.children ? (
            <Box key={item.label}>
              <ListItemButton onClick={() => handleToggleSubmenu(item.label)}>
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
                      component="a"
                      href={child.href}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={child.label} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Box>
          ) : (
            <ListItemButton key={item.label} component="a" href={item.href}>
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
              sx={{ flexGrow: 1, color: "primary.main", fontWeight: 700 }}
            >
              Sistema de Oração
            </Typography>
            {/* Ícone de perfil */}
            <IconButton onClick={handleProfileMenuOpen} sx={{ ml: 2 }}>
              <Avatar sx={{ bgcolor: "primary.main", width: 32, height: 32 }}>
                <AccountCircleIcon />
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>Perfil</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>Sair</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        {/* Espaço para AppBar */}
        <Toolbar sx={{ minHeight: 64 }} />
        {/* Conteúdo renderizado */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
