import { List, Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { useSession } from "../../context/System/SessionContext";
import { menuModuloIcons } from "../../model/menuModel";
import LalosMenuGroup from "./LalosMenuGroup";
import { Fragment } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const LalosMenuV2 = () => {
  const {
    definicionMenu,
    usuario,
    handleClickCerrarSesion
  } = useSession();

  const style = {
    mr: 1,
    ml: 1,
    verticalAlign: "bottom",
  };

  return (
    <Fragment>
      <Grid container spacing={1} sx={{ backgroundColor: "white", paddingTop: 2, paddingBottom: 2 }}>
        <Grid size={{ xs: 12}} textAlign="center">
          <Typography variant="h5" color="secondary">
            {usuario.nombrePerfil}
          </Typography>
          <Typography variant="body1" color="secondary">
            {usuario.nombres} {usuario.apellidos}
          </Typography>
        </Grid>
      </Grid>
      <List>
        {Object.keys(definicionMenu)
          .filter((clave_modulo) => clave_modulo !== "_paths" && definicionMenu[clave_modulo].mostrar)
          .map((clave_modulo) => (
            <>
              <LalosMenuGroup
                key={clave_modulo}
                icon={menuModuloIcons[clave_modulo]}
                name={definicionMenu[clave_modulo].nombre}
                clavesPaginas={definicionMenu[clave_modulo]["_paginas"]}
              />
            </>
          ))}
      </List>

      <Grid size={{ xs: 12}} sx={style}>
        <Button
          onClick={handleClickCerrarSesion}
          size="large"
          style={{ width: "100%", bottom: "0%" }}
          startIcon={<ExitToAppIcon />}
        >
          Cerrar sesión
        </Button>
      </Grid>
    </Fragment>
  );
};

export default LalosMenuV2;
