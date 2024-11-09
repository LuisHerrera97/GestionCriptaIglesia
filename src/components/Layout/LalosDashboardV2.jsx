import { Drawer } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import BackImage from "../../img/fontolpizza.jpg";
import LogoLalos from "../../img/logoLalos1.jpeg";
import LalosMenuV2 from "./LalosMenuV2";
import { dashboardPaginas } from "../../model/menuModel";
import { useConfiguration } from "../../context/System/ConfigurationContext";
import { useLayout } from "../../context/System/LayoutContext";
import { useSession } from "../../context/System/SessionContext";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LalosDashboardV2 = () => {
  const { definicionMenu } = useSession();
  const { menuClientOpen, menuDashboardOpen, handleCloseMenuClient } = useLayout();
  const { theme } = useConfiguration();
  
  const muiTheme = useTheme();
  const isLgDown = useMediaQuery(muiTheme.breakpoints.down('lg'));

  return (
    <Fragment>
      {!isLgDown && menuDashboardOpen && (
        <div className="menu-area" style={{ backgroundColor: theme.palette.primary.main }}>
          <LalosMenuV2 />
        </div>
      )}

      <Drawer
        open={menuClientOpen}
        anchor="left"
        onClose={handleCloseMenuClient}
        PaperProps={{ style: { backgroundColor: theme.palette.primary.main, width: 600, color: "initial" } }}
      >
        <div className="menu-area">
          <LalosMenuV2 />
        </div>
      </Drawer>

      <Routes>
        {Object.keys(definicionMenu)
          .filter((clave_modulo) => clave_modulo !== "_paths")
          .map((clave_modulo) =>
            Object.keys(definicionMenu[clave_modulo]["_paginas"]).map((clave_pagina) => (
              <Route
                key={clave_pagina}
                path={definicionMenu[clave_modulo]["_paginas"][clave_pagina].path}
                element={dashboardPaginas[clave_pagina]}
              />
            ))
          )}
        <Route
          path="/*"
          element={
            <div
              className="login-container"
              style={{
                backgroundImage: `url(${BackImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="op" style={{ backgroundColor: theme.palette.secondary.main + "BB" }}>
                <img src={LogoLalos} alt="logo_lalos" style={{ maxWidth: 500 }} />
              </div>
            </div>
          }
        />
      </Routes>
    </Fragment>
  );
};

export default LalosDashboardV2;
