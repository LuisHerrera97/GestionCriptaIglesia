import {apiInvitados, apiInvitadosId, apiObtenerInvitados,paginaInvitaciones } from "../../settings/apiConfig";
import { createContext, useContext, useState } from "react";
import { isErrorForm, isNullOrEmpty,ValoresGenericos } from "../../settings/utils";

import { useLayout } from "../System/LayoutContext";
import { useRequest } from "../System/RequestContext";
import { rxCaracteresEsp } from "../../settings/regexConfig";
import { enumEstatus, enumInvitadoDe } from "../../settings/enums";

const getInvitadosForm = () => ({
    idinvitado: { value: ValoresGenericos.GUI_DEFAULT, error: false },
    nombreInvitado: { value: "", error: false },
    numeroInvitados: { value: 0, error: false },
    invitadoDe: { value: ValoresGenericos.GUI_DEFAULT, error: false },
    estatus: { value: ValoresGenericos.GUI_DEFAULT, error: false }
});

export const InvitadosContext = createContext();

export const InvitadosProvider = (props) => {
    const { GetRequest, PostRequest, PutRequest, DeleteRequest } = useRequest();
    const { handleOpenAlert } = useLayout();

    const [invitadosLuis, setInvitadosLuis] = useState(0);
    const [invitadosGissel, setInvitadosGissel] = useState(0);
    const [invitadosTotal, setInvitadosTotal] = useState(0);
    const [confirmadosTotal, setConfirmardosTotal] = useState(0);
    const [pendientesTotal, setPendientesTotal] = useState(0);
    const [noConfirmadosTotal, setNoConfirmadosTotal] = useState(0);
    const [listaInvitados, setListaInvitados] = useState([]);
    const [invitadosSeleccionado, setInvitadosSeleccionado] = useState(null);
    const [invitadosForm, setInvitadosForm] = useState(getInvitadosForm());
    const [edicionInvitados, setEdicionInvitados] = useState(false);
    const [modalOpenInvitadosForm, setModalOpenInvitadosForm] = useState(false);
    const [modalOpenEliminarInvitados, setModalOpenEliminarInvitados] = useState(false);

    const handleCloseInvitadosForm = () => {
        setModalOpenInvitadosForm(false);
    };

    const handleCloseEliminarInvitados = () => {
        setModalOpenEliminarInvitados(false);
    };

    const handleChangeInvitadosForm = (e,value) => {

        let nombre = e.target.name;
        let valor = e.target.value;
        let id = e.target.id;

        if (id !== undefined && id.includes("invitadoDe")) {
            nombre = "invitadoDe";
            valor = value.invitadoDe;
        }

        if (id !== undefined && id.includes("estatus")) {
            nombre = "estatus";
            valor = value.estatus;
        }

        setInvitadosForm({
            ...invitadosForm,
            [nombre]: {
                value: valor,
                error: false,
            },
        });
    };

    const handleChangeInvitadosSeleccionado = (value) => {
        setInvitadosSeleccionado(value);
        handleRowClick(value);
    };

    const handleClickCrearInvitados = () => {
        setInvitadosForm(getInvitadosForm());
        setEdicionInvitados(false);
        setModalOpenInvitadosForm(true);
    };

    const handleClickEditarInvitados = async () => {
        if (!invitadosSeleccionado) {
            return;
        }
        const form = getInvitadosForm();
        form.nombreInvitado.value = isNullOrEmpty(invitadosSeleccionado.nombre) ? "" : invitadosSeleccionado.nombre;
        form.numeroInvitados.value = isNullOrEmpty(invitadosSeleccionado.numeroInvitados) ? 0 : invitadosSeleccionado.numeroInvitados;
        form.invitadoDe.value = isNullOrEmpty(invitadosSeleccionado.invitadoDe) ? "" : invitadosSeleccionado.invitadoDe;
        form.estatus.value = isNullOrEmpty(invitadosSeleccionado.estatus) ? "" : invitadosSeleccionado.estatus;
        setInvitadosForm(form);
        setEdicionInvitados(true);
        setModalOpenInvitadosForm(true);
    };

    const handleClickEliminarInvitados = () => {
        if (!invitadosSeleccionado) {
            return;
        }

        setModalOpenEliminarInvitados(true);
    };

    const handleClickObtenerInvitados = async () => {
        const response = await GetRequest({
            url: apiInvitados,
            loader: "Consultando invitados...",
        });

        if (response.hasError) {
            handleOpenAlert(response.message);
            return;
        }

        const getTotalByField = (field, value) =>
            response.result.filter(invitado => invitado[field] === value)
                     .reduce((acc, invitado) => acc + invitado.numeroInvitados, 0);

        setInvitadosLuis(getTotalByField("invitadoDe", enumInvitadoDe.Luis));
        setInvitadosGissel(getTotalByField("invitadoDe", enumInvitadoDe.Gissel));
        setConfirmardosTotal(getTotalByField("estatus", enumEstatus.Confirmado));
        setNoConfirmadosTotal(getTotalByField("estatus", enumEstatus.NoConfirmado));
        setPendientesTotal(getTotalByField("estatus", enumEstatus.Pendiente));
        setInvitadosTotal(response.result.reduce((acc, invitado) => acc + invitado.numeroInvitados, 0));

        const mapStatus = status => ({
            [enumEstatus.Cancelado]: "Cancelado",
            [enumEstatus.Confirmado]: "Confirmado",
            [enumEstatus.NoConfirmado]: "No confirmado",
            [enumEstatus.Pendiente]: "Pendiente"
        }[status]);
    
        const mapInvitadoDe = invitadoDe => ({
            [enumInvitadoDe.Luis]: "Luis",
            [enumInvitadoDe.Gissel]: "Gissel"
        }[invitadoDe]);

        const listaActualizada = response.result.map(invitado => {
            return {
              ...invitado,
              sEstatus:mapStatus(invitado.estatus),
              sInvitadoDe:mapInvitadoDe(invitado.invitadoDe),
              linkInvitacion:`${paginaInvitaciones}${invitado.idInvitado}`
            };
          });
          

        setListaInvitados(listaActualizada);
    };

    const handleClickRefrescarDatos = () => {
        handleClickObtenerInvitados();
    };

    const handleSubmitInvitadosForm = async () => {
        const { nombreInvitado,
            numeroInvitados,
            invitadoDe,estatus } = invitadosForm;

        const form = {
            ...invitadosForm,
            nombreInvitado: { ...nombreInvitado, error: isNullOrEmpty(nombreInvitado.value) || !rxCaracteresEsp.test(nombreInvitado.value) },
            numeroInvitados: { ...numeroInvitados, error: isNullOrEmpty(numeroInvitados.value) || !rxCaracteresEsp.test(numeroInvitados.value) },
            invitadoDe: { ...invitadoDe, error: isNullOrEmpty(invitadoDe.value) || invitadoDe.value === '00000000-0000-0000-0000-000000000000' },
            estatus: {
                ...estatus,
                error: edicionInvitados && (isNullOrEmpty(estatus.value) || estatus.value === '00000000-0000-0000-0000-000000000000')
            }
        };

        setInvitadosForm(form);
        if (isErrorForm(form)) {
            return;
        }

        const InvitadosModel = {
            idInvitado: edicionInvitados ? invitadosSeleccionado?.idInvitado : '00000000-0000-0000-0000-000000000000',
            nombre: nombreInvitado.value.toUpperCase(),
            numeroInvitados: numeroInvitados.value,
            invitadoDe: invitadoDe.value,
            estatus:estatus.value
        };

        if (edicionInvitados) {
            if (!invitadosSeleccionado) {
                return;
            }
            const response = await PutRequest({
                url: apiInvitadosId.replace("{idInvitados}", invitadosSeleccionado.idInvitado),
                loader: "Actualizando invitado...",
                body: InvitadosModel,
                alert: true,
            });
            if (response.hasError) {
                return;
            }

            setInvitadosSeleccionado(response.result);
        } else {
            const response = await PostRequest({
                url: apiInvitados,
                loader: "Creando invitado...",
                body: InvitadosModel,
                alert: true,
            });

            if (response.hasError) {
                return;
            }

            setInvitadosSeleccionado(response.result);
        }

        setModalOpenInvitadosForm(false);
        await handleClickObtenerInvitados();
    };

    const handleSubmitEliminarInvitados = async () => {
        if (!invitadosSeleccionado) {
            return;
        }

        const response = await DeleteRequest({
            url: apiInvitadosId.replace("{idInvitados}", invitadosSeleccionado.idInvitado),
            loader: "Eliminando invitado...",
            alert: true,
        });

        if (response.hasError) {
            return;
        }

        setInvitadosSeleccionado(null);
        setModalOpenEliminarInvitados(false);
        await handleClickObtenerInvitados();
    };

    const handleRowClick = (invitado) => {
        navigator.clipboard.writeText(invitado.linkInvitacion)
            .then(() => {
                handleOpenAlert(
                    `Invitación para: ${invitado.nombre}`,
                    "success"
                );
            })
            .catch(err => {
                console.error('Error al copiar el nombre: ', err);
            });
    };

    return (
        <InvitadosContext.Provider
            value={{
                invitadosLuis,
                invitadosGissel,
                invitadosTotal,
                listaInvitados,
                invitadosSeleccionado,
                invitadosForm,
                edicionInvitados,
                modalOpenInvitadosForm,
                modalOpenEliminarInvitados,
                confirmadosTotal,
                pendientesTotal,
                noConfirmadosTotal,
                handleCloseInvitadosForm,
                handleCloseEliminarInvitados,
                handleChangeInvitadosForm,
                handleChangeInvitadosSeleccionado,
                handleClickCrearInvitados,
                handleClickEditarInvitados,
                handleClickEliminarInvitados,
                handleClickObtenerInvitados,
                handleClickRefrescarDatos,
                handleSubmitInvitadosForm,
                handleSubmitEliminarInvitados,
            }}
        >
            {props.children}
        </InvitadosContext.Provider>
    );
};

export const useInvitados = () => useContext(InvitadosContext);
