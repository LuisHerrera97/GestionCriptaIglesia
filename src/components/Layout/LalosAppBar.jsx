import { AppBar, IconButton, Toolbar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import LalosLogoMain from "../../img/logo1.png";
import { useLayout } from "../../context/System/LayoutContext";
import { useSession } from "../../context/System/SessionContext";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function LalosAppBar() {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isSmDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { configuracion: { tituloDependencia } } = useSession();
  const { handleOpenMenuClient, menuDashboardOpen, handleOpenMenuDashboard, handleCloseMenuDashboard } = useLayout();

  return (
    <AppBar position="static" color="transparent" variant="elevation" style={{ overflowX: "auto" }}>
      <Toolbar variant="dense" style={{ marginTop: 2, marginBottom: 2 }}>
        {!isLgUp && (
          <IconButton color="primary" sx={{ marginRight: 2 }} onClick={handleOpenMenuClient}>
            <MenuIcon />
          </IconButton>
        )}
        {isLgUp && (
          menuDashboardOpen ? (
            <Tooltip title="Ocultar menú">
              <IconButton color="primary" sx={{ marginRight: 2 }} onClick={handleCloseMenuDashboard}>
                <MenuOpenIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Mostrar menú">
              <IconButton color="primary" sx={{ marginRight: 2 }} onClick={handleOpenMenuDashboard}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )
        )}
        {!isSmDown && (
          <div style={{ flexGrow: 1 }}>
            <img
              src={LalosLogoMain}
              alt={tituloDependencia}
              title={tituloDependencia}
              style={{ height: 48, marginLeft: 20, marginRight: 20 }}
            />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
