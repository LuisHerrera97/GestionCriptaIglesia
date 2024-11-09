import { IconButton, Tooltip } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Fragment } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useInvitados } from "../../../context/Boda/InvitadosContext";

export default function InvitadosActions() {
    const {
        invitadosSeleccionado,
        handleClickCrearInvitados,
        handleClickEditarInvitados,
        handleClickEliminarInvitados,
        handleClickRefrescarDatos,
    } = useInvitados();

    return (
        <Fragment>

            <Tooltip title="Crear invitado">
                <IconButton onClick={handleClickCrearInvitados}>
                    <AddIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Editar invitado">
                <IconButton onClick={handleClickEditarInvitados} disabled={!invitadosSeleccionado}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar invitados">
                <IconButton onClick={handleClickEliminarInvitados} disabled={!invitadosSeleccionado}>
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Refrescar datos">
                <IconButton onClick={handleClickRefrescarDatos}>
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
        </Fragment>
    );
}
