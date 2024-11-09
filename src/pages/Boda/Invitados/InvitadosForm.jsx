import { TextField, Autocomplete } from "@mui/material";
import Grid from '@mui/material/Grid2';
import LalosModal from "../../../components/LalosModal"
import {useInvitados} from "../../../context/Boda/InvitadosContext";
import { rxCaracteresEsp } from "../../../settings/regexConfig";
import LalosOnlyNumberInput from "../../../components/LalosOnlyNumberInput";
import { enumInvitadoDe,enumEstatus } from "../../../settings/enums";

export default function InvitadosForm() {
  const {
    invitadosForm,
    edicionInvitados,
    modalOpenInvitadosForm,
    handleCloseInvitadosForm,
    handleChangeInvitadosForm,
    handleSubmitInvitadosForm,
  } = useInvitados();

  const lstNivel = [
    { label: 'Luis', invitadoDe: enumInvitadoDe.Luis },
    { label: 'Gissel', invitadoDe: enumInvitadoDe.Gissel }
  ];

  const lstEstatus = [
    { label: 'Pendiente', estatus: enumEstatus.Pendiente },
    { label: 'Confirmado', estatus: enumEstatus.Confirmado },
    { label: 'No confirmado', estatus: enumEstatus.NoConfirmado }
  ];

  return (
    <LalosModal
      form
      open={modalOpenInvitadosForm}
      title={edicionInvitados ? "Editar invitado" : "Crear invitado"}
      onClose={handleCloseInvitadosForm}
      onSuccess={handleSubmitInvitadosForm}
      success={edicionInvitados ? "Editar" : "Crear"}
    >
      <Grid container spacing={2}>
        <Grid size={{xs:12,md:12}}>
          <TextField
            name="nombreInvitado"
            label="Nombre del invitado:"
            value={invitadosForm.nombreInvitado.value}
            onChange={handleChangeInvitadosForm}
            error={invitadosForm.nombreInvitado.error || !rxCaracteresEsp.test(invitadosForm.nombreInvitado.value)}
            helperText={
              invitadosForm.nombreInvitado.error
                ? "Nombre de invitado es requerida"
                : !rxCaracteresEsp.test(invitadosForm.nombreInvitado.value)
                  ? "No se permiten caracteres especiales"
                  : ""
            }
            required
            inputProps={{
              maxLength: 200,
              minLength: 1,
              style: {
                textTransform: "uppercase",
              },
            }}
          />
        </Grid>
        <Grid size={{xs:12,sm:12,md:12}}>
          <TextField
            name="numeroInvitados"
            label="Número de invitado:"
            value={invitadosForm.numeroInvitados.value}
            onChange={handleChangeInvitadosForm}
            error={invitadosForm.numeroInvitados.error || !rxCaracteresEsp.test(invitadosForm.numeroInvitados.value)}
            helperText={
              invitadosForm.numeroInvitados.error
                ? "Número de invitados requerido"
                : !rxCaracteresEsp.test(invitadosForm.numeroInvitados.value)
                  ? "No se permiten caracteres especiales"
                  : ""
            }
            required
            inputProps={{
              maxLength: 50,
              minLength: 1,
            }}
            InputProps={{
              inputComponent: LalosOnlyNumberInput,
            }}
          />
        </Grid>
        <Grid size={{xs:12,md:12}}>
          <Autocomplete
            noOptionsText={"Sin resultados"}
            disableClearable
            id={"estatus"}
            onChange={handleChangeInvitadosForm}
            value={
              invitadosForm.estatus.value !== undefined && invitadosForm.estatus.value !== ""
                ? lstEstatus.find((x) => x.estatus === invitadosForm.estatus.value)
                : null
            }
            options={lstEstatus}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Estatus:"
                error={invitadosForm.estatus.error}
                helperText={invitadosForm.estatus.error && "El campo de estatus es requerido"}
                required
              />
            )}
          />
        </Grid>
        <Grid size={{xs:12,sm:12,md:12}}>
          <Autocomplete
            noOptionsText={"Sin resultados"}
            disableClearable
            id={"invitadoDe"}
            onChange={handleChangeInvitadosForm}
            value={
              invitadosForm.invitadoDe.value !== undefined && invitadosForm.invitadoDe.value !== ""
                ? lstNivel.find((x) => x.invitadoDe === invitadosForm.invitadoDe.value)
                : null
            }
            options={lstNivel}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Invitado de:"
                error={invitadosForm.invitadoDe.error}
                helperText={invitadosForm.invitadoDe.error && "El campo Inivitado de es requerido"}
                required
              />
            )}
          />
        </Grid>
      </Grid>
    </LalosModal>
  );
}
