import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import LalosModal from "../../../components/LalosModal"
import { useInvitados } from "../../../context/Boda/InvitadosContext";

export default function InvitadosEliminar() {
  const { modalOpenEliminarInvitados, handleCloseEliminarInvitados, handleSubmitEliminarInvitados } = useInvitados();

  return (
    <LalosModal
      open={modalOpenEliminarInvitados}
      title="Eliminar invitado"
      onClose={handleCloseEliminarInvitados}
      onSuccess={handleSubmitEliminarInvitados}
      success="Eliminar"
    >
      <Grid container>
        <Grid size={{ xs: 12}}>
          <Typography>¿Desea eliminar el registro seleccionado?</Typography>
        </Grid>
      </Grid>
    </LalosModal>
  );
}
