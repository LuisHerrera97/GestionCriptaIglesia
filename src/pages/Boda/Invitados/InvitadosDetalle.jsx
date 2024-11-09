import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import LalosLabelInfo from "../../../components/LalosLabelInfo";
import { useInvitados } from "../../../context/Boda/InvitadosContext";

export default function InvitadosDetalle() {
  const { invitadosSeleccionado } = useInvitados();

  if (!invitadosSeleccionado) {
    return <Typography>Seleccione un registro para ver el detalle</Typography>;
  }

  return (
    <Grid container>
      <Grid size={{ xs: 12}}>
        <LalosLabelInfo label="Nombre del invitado:">{invitadosSeleccionado.nombre}</LalosLabelInfo>
      </Grid>
      <Grid size={{ xs: 12}}>
        <LalosLabelInfo label="Número de invitados:">{invitadosSeleccionado.numeroInvitados}</LalosLabelInfo>
      </Grid>
      <Grid size={{ xs: 12}}>
        <LalosLabelInfo label="Invitado De:">{invitadosSeleccionado.sInvitadoDe}</LalosLabelInfo>
      </Grid>
      <Grid size={{ xs: 12}}>
        <LalosLabelInfo label="Link de invitación:">{invitadosSeleccionado.linkInvitacion}</LalosLabelInfo>
      </Grid>
      <Grid size={{ xs: 12}}>
        <LalosLabelInfo label="Estatus:">{invitadosSeleccionado.sEstatus}</LalosLabelInfo>
      </Grid>
    </Grid>
  );
}
