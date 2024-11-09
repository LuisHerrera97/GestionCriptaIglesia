import {TextField, Box, IconButton, Tooltip, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { Fragment, useEffect } from "react";
import LalosLayout from "../../../components/LalosLayout";
import SaveIcon from "@mui/icons-material/Save";
import { useLayout } from "../../../context/System/LayoutContext";
import { useSession } from "../../../context/System/SessionContext";
import { useContrasenia } from "../../../context/Seguridad/ContraseniaContext";

export default function CambioContrasenia() {
  const { handleChangeTitle, handleChangeClavePaginaActual } = useLayout();
  const { getPermisoBoton, getNombreBoton, usuario } = useSession();
  const { cambioContraseniaForm, handleChangecambioContrasenia, handleSubmitcambioContrasenia } = useContrasenia();

  useEffect(() => {
    handleChangeTitle("Cambio de contraseña");
    handleChangeClavePaginaActual("contrasenia");
    // eslint-disable-next-line
  }, []);

  return (
    <LalosLayout
      titlePage="Cambio de contraseña"
      buttonActions={
        <Fragment>
          {getPermisoBoton("cambiar_contrasenia") && (
            <Tooltip title={getNombreBoton("cambiar_contrasenia")}>
              <IconButton onClick={handleSubmitcambioContrasenia}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
          )}
        </Fragment>
      }
    >
      <Box p={2}>
        <Grid container>
          <Grid size={{ xs: 12}}>
            <Typography>Para aplicar el cambio de contraseña debe guardar este cambio</Typography>
          </Grid>
          <Grid size={{ xs: 12,sm:6}}>
            <TextField name="usuario" label="Usuario:" value={usuario.username} disabled />
          </Grid>
          <Grid size={{ xs: 12,sm:6}}></Grid>
          <Grid size={{ xs: 12,sm:6}}>
            <TextField
              name="contraseniaActual"
              label="Contraseña actual:"
              value={cambioContraseniaForm.contraseniaActual.value}
              onChange={handleChangecambioContrasenia}
              error={cambioContraseniaForm.contraseniaActual.error}
              required
              type="password"
              slotProps={{
                input: {
                  maxLength: 500,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12,sm:6}}></Grid>
          <Grid size={{ xs: 12,sm:6}}>
            <TextField
              name="contraseniaNueva"
              label="Contraseña nueva:"
              value={cambioContraseniaForm.contraseniaNueva.value}
              onChange={handleChangecambioContrasenia}
              error={cambioContraseniaForm.contraseniaNueva.error}
              required
              type="password"
              autoComplete="new-password"
              slotProps={{
                input: {
                  maxLength: 500,
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </LalosLayout>
  );
}
