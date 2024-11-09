import { Box, Grid, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { Fragment, useEffect } from "react";

import ObraLayout from "../../utils/ObraLayout";
import SaveIcon from "@mui/icons-material/Save";
import SquareIcon from "@mui/icons-material/Square";
import { useConfiguracionGeneral } from "../../../context/Seguridad/ConfiguracionGeneralContext";
import { useLayout } from "../../../context/System/LayoutContext";
import { useSession } from "../../../context/System/SessionContext";

export default function Configuracion() {
  const { handleChangeTitle, handleChangeClavePaginaActual } = useLayout();
  const { getPermisoBoton, getNombreBoton } = useSession();
  const {
    configuracionForm: {
      colorPrimario,
      colorSecundario,
      contrastePrimario,
      contrasteSecundario,
      tituloDependencia,
      tituloNavegador,
      metaDescription,
      nombreFuente,
      urlFuente,
    },
    handleChangeConfiguracionForm,
    handleClickObtenerConfiguracion,
    handleClickGuardarConfiguracion,
  } = useConfiguracionGeneral();

  useEffect(() => {
    handleChangeTitle("Configuración general de la dependencia");
    handleChangeClavePaginaActual("configuracion_general");
    handleClickObtenerConfiguracion();
    // eslint-disable-next-line
  }, []);

  return (
    <ObraLayout
      titlePage="Configuración general de la dependencia"
      buttonActions={
        <Fragment>
          {getPermisoBoton("guardar_configuracion_dependencia") && (
            <Tooltip title={getNombreBoton("guardar_configuracion_dependencia")}>
              <IconButton onClick={handleClickGuardarConfiguracion}>
                <SaveIcon />
              </IconButton>
            </Tooltip>
          )}
        </Fragment>
      }
    >
      <Box p={2}>
        <Grid container>
          <Grid item xs={12}>
            <Typography> Para aplicar los cambios realizados recargue la página</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Colores</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="colorPrimario"
              label="Color primario:"
              value={colorPrimario.value}
              onChange={handleChangeConfiguracionForm}
              error={colorPrimario.error}
              helperText={colorPrimario.error && "Color primario requerido"}
              required
              slotProps={{
                input: {
                  maxLength: 7,
                },
                endAdornment: (
                  <SquareIcon
                    fontSize="large"
                    sx={{
                      color: colorPrimario.value,
                      border: "1px solid lightgray",
                      borderRadius: 1,
                    }}
                  />
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="colorSecundario"
              label="Color secundario:"
              value={colorSecundario.value}
              onChange={handleChangeConfiguracionForm}
              error={colorSecundario.error}
              helperText={colorSecundario.error && "Color secundario requerido"}
              required
              InputProps={{
                endAdornment: (
                  <SquareIcon
                    fontSize="large"
                    sx={{
                      color: colorSecundario.value,
                      border: "1px solid lightgray",
                      borderRadius: 1,
                    }}
                  />
                ),
              }}
              inputProps={{ maxLength: 7 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="contrastePrimario"
              label="Contraste de color primario:"
              value={contrastePrimario.value}
              onChange={handleChangeConfiguracionForm}
              error={contrastePrimario.error}
              helperText={contrastePrimario.error && "Contraste de color primario requerido"}
              required
              InputProps={{
                endAdornment: (
                  <SquareIcon
                    fontSize="large"
                    sx={{
                      color: contrastePrimario.value,
                      border: "1px solid lightgray",
                      borderRadius: 1,
                    }}
                  />
                ),
              }}
              inputProps={{ maxLength: 7 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="contrasteSecundario"
              label="Contraste de color secundario:"
              value={contrasteSecundario.value}
              onChange={handleChangeConfiguracionForm}
              error={contrasteSecundario.error}
              helperText={contrasteSecundario.error && "Contraste de color secundario requerido"}
              required
              InputProps={{
                endAdornment: (
                  <SquareIcon
                    fontSize="large"
                    sx={{
                      color: contrasteSecundario.value,
                      border: "1px solid lightgray",
                      borderRadius: 1,
                    }}
                  />
                ),
              }}
              inputProps={{ maxLength: 7 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Títulos</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="tituloDependencia"
              label="Título o nombre de la dependencia:"
              value={tituloDependencia.value}
              onChange={handleChangeConfiguracionForm}
              error={tituloDependencia.error}
              helperText={tituloDependencia.error && "Título de dependencia requerido"}
              required
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="tituloNavegador"
              label="Título en el navegador:"
              value={tituloNavegador.value}
              onChange={handleChangeConfiguracionForm}
              error={tituloNavegador.error}
              helperText={tituloNavegador.error && "Título en el navegador requerido"}
              required
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="metaDescription"
              label="Información de la dependencia:"
              value={metaDescription.value}
              onChange={handleChangeConfiguracionForm}
              error={metaDescription.error}
              helperText={metaDescription.error && "Información de la dependencia requerido"}
              required
              inputProps={{ maxLength: 500 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2">Tipografías</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
            <TextField
              name="urlFuente"
              label="Url de la fuente:"
              value={urlFuente.value}
              onChange={handleChangeConfiguracionForm}
              error={urlFuente.error}
              helperText={urlFuente.error && "Url de la fuente requerido"}
              required
              inputProps={{ maxLength: 500 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              name="nombreFuente"
              label="Nombre de la fuente:"
              value={nombreFuente.value}
              onChange={handleChangeConfiguracionForm}
              error={nombreFuente.error}
              helperText={nombreFuente.error && "Nombre de la fuente requerido"}
              required
              inputProps={{ maxLength: 50 }}
            />
          </Grid>
        </Grid>
      </Box>
    </ObraLayout>
  );
}
