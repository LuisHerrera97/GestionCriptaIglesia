import { Fragment, useEffect } from "react";
import { TextField } from "@mui/material";

import InvitadosActions from "./InvitadosActions";
import InvitadosDetalle from "./InvitadosDetalle";
import InvitadosEliminar from "./InvitadosEliminar";
import InvitadosForm from "./InvitadosForm";
import Grid from '@mui/material/Grid2';
import LalosLayout from "../../../components/LalosLayout"
import LalosTable from "../../../components/LalosTable";
import LalosLabelInfo from "../../../components/LalosLabelInfo";
import { useInvitados } from "../../../context/Boda/InvitadosContext";
import { useLayout } from "../../../context/System/LayoutContext";

export default function Invitados() {
  const { handleChangeTitle, handleChangeClavePaginaActual } = useLayout();
  const {
    listaInvitados,
    invitadosSeleccionado,
    handleChangeInvitadosSeleccionado,
    handleClickRefrescarDatos,
    invitadosLuis,
    invitadosGissel,
    invitadosTotal,
    confirmadosTotal,
    pendientesTotal
  } = useInvitados();


  useEffect(() => {
    handleChangeTitle("Invitados");
    handleChangeClavePaginaActual("Invitados");
    handleClickRefrescarDatos();
  }, []);

  return (
    <Fragment >
      <LalosLayout titlePage="Catálogo de invitados" buttonActions={<InvitadosActions />} detailComponent={<InvitadosDetalle />}>
        <Grid container padding={2} spacing={2}>
            <Grid size={{ xs: 6, md:3}}>
                <LalosLabelInfo label="Total invitados Luis:" inline>
                    {invitadosLuis}
                </LalosLabelInfo>
            </Grid>
            <Grid size={{ xs: 6, md:3}}>
                <LalosLabelInfo label="Total invitados Gissel:" inline>
                    {invitadosGissel}
                </LalosLabelInfo>
            </Grid>
            <Grid size={{ xs: 6, md:3}}>
                <LalosLabelInfo label="Total invitados:" inline>
                    {invitadosTotal}
                </LalosLabelInfo>
            </Grid>
            <Grid size={{ xs: 6, md:3}}>
                <LalosLabelInfo label="Total Confirmados:" inline>
                    {confirmadosTotal}
                </LalosLabelInfo>
            </Grid>
            <Grid size={{ xs: 6, md:3}}>
                <LalosLabelInfo label="Total pendientes:" inline>
                    {pendientesTotal}
                </LalosLabelInfo>
            </Grid>
        </Grid>
        <Grid container>
          <Grid xs={12}>
            <LalosTable
              columns={[
                { title: "Nombre del invitado", field: "nombre" },
                { title: "Número de invitados", field: "numeroInvitados" },
                { title: "Invitado de", field: "sInvitadoDe" },
                { title: "Estatus", field: "sEstatus" },
                { title: "Link de invitación", field: "linkInvitacion" }
              ]}
              data={listaInvitados}
              id="idInvitado"
              row={invitadosSeleccionado}
              setRow={handleChangeInvitadosSeleccionado}
            />
          </Grid>
        </Grid>
      </LalosLayout>
      <InvitadosForm />
      <InvitadosEliminar />
    </Fragment>
  );
}
