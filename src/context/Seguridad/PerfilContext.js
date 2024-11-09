import { apiPerfil, apiPerfilId, apiPerfilPermisos } from "../../settings/apiConfig";
import { createContext, useContext, useState } from "react";
import { isErrorForm, isNullOrEmpty } from "../../settings/utils";

import { useLayout } from "../System/LayoutContext";
import { useNavigate } from "react-router-dom";
import { useRequest } from "../System/RequestContext";
import { useSession } from "../System/SessionContext";

const getPerfilForm = () => ({
    clavePerfil: { value: "", error: false },
    nombrePerfil: { value: "", error: false },
    eliminable: true,
});

export const PerfilContext = createContext();

export const PerfilProvider = (props) => {
    const { GetRequest, PostRequest, PutRequest, DeleteRequest } = useRequest();
    const { handleOpenAlert } = useLayout();
    const navigate = useNavigate();
    const { definicionMenu } = useSession();

    const [anchorEl, setAnchorEl] = useState(null);
    const [listaPerfiles, setListaPerfiles] = useState([]);
    const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
    const [perfilForm, setPerfilForm] = useState(getPerfilForm());
    const [edicionPerfil, setEdicionPerfil] = useState(false);

    const [modalOpenPerfilForm, setModalOpenPerfilForm] = useState(false);
    const [modalOpenEliminarPerfil, setModalOpenEliminarPerfil] = useState(false);

    const [perfilDetalle, setPerfilDetalle] = useState(null);
    const [perfilPermisos, setPerfilPermisos] = useState([]);
    const [permisosEdicion, setPermisosEdicion] = useState([]);
    const [editado, setEditado] = useState(false);

    const [modalOpenDeshacerCambios, setModalOpenDeshacerCambios] = useState(false);
    const [modalOpenCancelarRegresar, setModalOpenCancelarRegresar] = useState(false);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClosePerfilForm = () => {
        setModalOpenPerfilForm(false);
    };

    const handleCloseEliminarPerfil = () => {
        setModalOpenEliminarPerfil(false);
    };

    const handleChangePerfilForm = (e) => {
        setPerfilForm({
            ...perfilForm,
            [e.target.name]: {
                value: e.target.value,
                error: false,
            },
        });
    };

    const handleChangePerfilSeleccionado = (value) => {
        setPerfilSeleccionado(value);
    };

    const handleClickNuevoPerfil = () => {
        setAnchorEl(null);
        setPerfilForm(getPerfilForm());
        setEdicionPerfil(false);
        setModalOpenPerfilForm(true);
    };

    const handleClickEditarPerfil = () => {
        if (!perfilSeleccionado) {
            return;
        }

        setAnchorEl(null);
        const form = getPerfilForm();
        form.clavePerfil.value = isNullOrEmpty(perfilSeleccionado.clavePerfil) ? "" : perfilSeleccionado.clavePerfil;
        form.nombrePerfil.value = isNullOrEmpty(perfilSeleccionado.nombrePerfil) ? "" : perfilSeleccionado.nombrePerfil;
        form.eliminable = perfilSeleccionado.eliminable;
        setPerfilForm(form);
        setEdicionPerfil(true);
        setModalOpenPerfilForm(true);
    };

    const handleClickEliminarPerfil = () => {
        if (!perfilSeleccionado) {
            return;
        }

        if (!perfilSeleccionado.eliminable) {
            handleOpenAlert(
                "El perfil seleccionado no puede eliminarse debido a que es un perfil del sistema",
                "warning"
            );
            return;
        }

        setAnchorEl(null);
        setModalOpenEliminarPerfil(true);
    };

    const handleClickAdministrarPermisos = () => {
        if (!perfilSeleccionado) {
            return;
        }

        const route = definicionMenu["_paths"]["perfiles_permisos"].replace(":idPerfil", perfilSeleccionado.idPerfil);
        navigate(route);
    };

    const handleClickObtenerPerfiles = async () => {
        const response = await GetRequest({
            url: apiPerfil,
            loader: "Consultando perfiles...",
        });

        if (response.hasError) {
            handleOpenAlert(response.message);
            return;
        }

        setListaPerfiles(response.result);
    };

    const handleSubmitPerfilForm = async () => {
        const { clavePerfil, nombrePerfil } = perfilForm;
        const form = {
            ...perfilForm,
            clavePerfil: {
                ...clavePerfil,
                error: isNullOrEmpty(clavePerfil.value),
            },
            nombrePerfil: {
                ...nombrePerfil,
                error: isNullOrEmpty(nombrePerfil.value),
            },
        };

        setPerfilForm(form);
        if (isErrorForm(form)) {
            return;
        }

        const perfilModel = {
            clavePerfil: clavePerfil.value,
            nombrePerfil: nombrePerfil.value,
        };

        if (edicionPerfil) {
            if (!perfilSeleccionado) {
                return;
            }

            const response = await PutRequest({
                url: apiPerfilId.replace("{idPerfil}", perfilSeleccionado.idPerfil),
                loader: "Actualizando perfil",
                body: perfilModel,
                alert: true,
            });

            if (response.hasError) {
                return;
            }

            setPerfilSeleccionado(response.result);
        } else {
            const response = await PostRequest({
                url: apiPerfil,
                loader: "Creando perfil...",
                body: perfilModel,
                alert: true,
            });

            if (response.hasError) {
                return;
            }

            setPerfilSeleccionado(response.result);
        }

        setModalOpenPerfilForm(false);
        await handleClickObtenerPerfiles();
    };

    const handleSubmitEliminarPerfil = async () => {
        if (!perfilSeleccionado) {
            return;
        }

        const response = await DeleteRequest({
            url: apiPerfilId.replace("{idPerfil}", perfilSeleccionado.idPerfil),
            loader: "Eliminando perfil...",
            alert: true,
        });

        if (response.hasError) {
            return;
        }

        setPerfilSeleccionado(null);
        setModalOpenEliminarPerfil(false);
        await handleClickObtenerPerfiles();
    };

    const handleClickObtenerPermisos = async (idPerfil) => {
        const response = await GetRequest({
            url: apiPerfilPermisos.replace("{idPerfil}", idPerfil),
            loader: "Consultando permisos...",
        });

        if (response.hasError) {
            handleOpenAlert(response.message);
            return;
        }

        const { perfil, permisos } = response.result;
        setPerfilDetalle(perfil);
        setPerfilPermisos(permisos);
        setPermisosEdicion(permisos);
    };

    const handleClickModulo = (e, modulo) => {
        e.stopPropagation();

        const tempList = permisosEdicion.map((x) => ({
            ...x,
            tienePermiso: x.idModulo === modulo.idModulo ? !x.tienePermiso : x.tienePermiso,
        }));

        setEditado(true);
        setPermisosEdicion(tempList);
    };

    const handleClickPagina = (e, modulo, pagina) => {
        e.stopPropagation();

        const tempList = permisosEdicion.map((x) => ({
            ...x,
            // tienePermiso:
            //     x.idModulo === modulo.idModulo
            //         ? !x.tienePermiso === true || x.permisosPagina.some((w) => w.tienePermiso && pagina)
            //         : x.tienePermiso,
            permisosPagina:
                x.idModulo === modulo.idModulo
                    ? x.permisosPagina.map((y) => ({
                        ...y,
                        tienePermiso: y.idPagina === pagina.idPagina ? !y.tienePermiso : y.tienePermiso,
                    }))
                    : x.permisosPagina,
        }));

        setEditado(true);
        setPermisosEdicion(tempList);
    };

    const handleClickBoton = (e, modulo, pagina, boton) => {
        e.stopPropagation();

        const tempList = permisosEdicion.map((x) => ({
            ...x,
            permisosPagina:
                x.idModulo === modulo.idModulo
                    ? x.permisosPagina.map((y) => ({
                        ...y,
                        permisosBoton:
                            y.idPagina === pagina.idPagina
                                ? y.permisosBoton.map((z) => ({
                                    ...z,
                                    tienePermiso: z.idBoton === boton.idBoton ? !z.tienePermiso : z.tienePermiso,
                                }))
                                : y.permisosBoton,
                    }))
                    : x.permisosPagina,
        }));

        setEditado(true);
        setPermisosEdicion(tempList);
    };

    const handleClickGuardarPermisos = async () => {
        if (!editado) {
            return;
        }

        const response = await PostRequest({
            url: apiPerfilPermisos.replace("{idPerfil}", perfilDetalle.idPerfil),
            loader: "Guardando permisos...",
            body: permisosEdicion,
            alert: true,
        });

        if (response.hasError) {
            return;
        }

        navigate(definicionMenu["_paths"]["perfiles"]);
    };

    const handleCloseDeshacerCambios = () => {
        setModalOpenDeshacerCambios(false);
    };

    const handleCloseCancelarRegresar = () => {
        setModalOpenCancelarRegresar(false);
    };

    const handleClickDeshacerCambios = () => {
        if (!editado) {
            return;
        }

        setModalOpenDeshacerCambios(true);
    };

    const handleClickConfirmarDeshacerCambios = () => {
        setEditado(false);
        setPermisosEdicion(perfilPermisos);
        setModalOpenDeshacerCambios(false);
    };

    const handleClickCancelarRegresar = () => {
        if (!editado) {
            navigate(definicionMenu["_paths"]["perfiles"]);
            return;
        }

        setModalOpenCancelarRegresar(true);
    };

    const handleClickConfirmarCancelarRegresar = () => {
        setModalOpenCancelarRegresar(false);
        setEditado(false);
        navigate(definicionMenu["_paths"]["perfiles"]);
    };

    return (
        <PerfilContext.Provider
            value={{
                anchorEl,
                listaPerfiles,
                perfilSeleccionado,
                perfilForm,
                edicionPerfil,
                modalOpenPerfilForm,
                modalOpenEliminarPerfil,
                open,
                perfilDetalle,
                perfilPermisos,
                permisosEdicion,
                editado,
                modalOpenDeshacerCambios,
                modalOpenCancelarRegresar,
                handleClick,
                handleClose,
                handleClosePerfilForm,
                handleCloseEliminarPerfil,
                handleChangePerfilForm,
                handleChangePerfilSeleccionado,
                handleClickNuevoPerfil,
                handleClickEditarPerfil,
                handleClickEliminarPerfil,
                handleClickAdministrarPermisos,
                handleClickObtenerPerfiles,
                handleSubmitPerfilForm,
                handleSubmitEliminarPerfil,
                handleClickObtenerPermisos,
                handleClickModulo,
                handleClickPagina,
                handleClickBoton,
                handleClickGuardarPermisos,
                handleCloseDeshacerCambios,
                handleCloseCancelarRegresar,
                handleClickDeshacerCambios,
                handleClickConfirmarDeshacerCambios,
                handleClickCancelarRegresar,
                handleClickConfirmarCancelarRegresar
            }}
        >
            {props.children}
        </PerfilContext.Provider>
    );
};

export const usePerfil = () => useContext(PerfilContext);
