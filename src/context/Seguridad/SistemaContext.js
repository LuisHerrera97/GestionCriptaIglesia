import {
    apiBoton,
    apiBotonId,
    apiConfiguracionElementos,
    apiModulo,
    apiModuloId,
    apiPagina,
    apiPaginaId,
} from "../../settings/apiConfig";
import { createContext, useContext, useState } from "react";
import { isErrorForm, isNullOrEmpty } from "../../settings/utils";

import { useLayout } from "../System/LayoutContext";
import { useRequest } from "../System/RequestContext";

export const tipoElemento = {
    none: 0,
    modulo: 1,
    pagina: 2,
    boton: 3,
};

const getModuloForm = () => ({
    nombreModulo: { value: "", error: false },
    claveModulo: { value: "", error: false },
    pathModulo: { value: "", error: false },
    mostrarEnMenu: true,
});

const getPaginaForm = () => ({
    clavePagina: { value: "", error: false },
    nombrePagina: { value: "", error: false },
    pathPagina: { value: "", error: false },
    mostrarEnMenu: true,
});

const getBotonForm = () => ({
    claveBoton: { value: "", error: false },
    nombreBoton: { value: "", error: false },
});

export const SistemaContext = createContext();

export const SistemaProvider = (props) => {
    const { GetRequest, PostRequest, PutRequest, DeleteRequest } = useRequest();
    const { handleOpenAlert } = useLayout();

    const [elements, setElements] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [tipoElementoSeleccionado, setTipoElementoSeleccionado] = useState(tipoElemento.none);
    const [moduloSeleccionado, setModuloSeleccionado] = useState(null);
    const [paginaSeleccionada, setPaginaSeleccionada] = useState(null);
    const [botonSeleccionado, setBotonSeleccionado] = useState(null);

    const [modalOpenModuloForm, setModalOpenModuloForm] = useState(false);
    const [modalOpenPaginaForm, setModalOpenPaginaForm] = useState(false);
    const [modalOpenBotonForm, setModalOpenBotonForm] = useState(false);

    const [modalOpenEliminarModulo, setModalOpenEliminarModulo] = useState(false);
    const [modalOpenEliminarPagina, setModalOpenEliminarPagina] = useState(false);
    const [modalOpenEliminarBoton, setModalOpenEliminarBoton] = useState(false);

    const [edicionModulo, setEdicionModulo] = useState(false);
    const [edicionPagina, setEdicionPagina] = useState(false);
    const [edicionBoton, setEdicionBoton] = useState(false);

    const [moduloForm, setModuloForm] = useState(getModuloForm());
    const [paginaForm, setPaginaForm] = useState(getPaginaForm());
    const [botonForm, setBotonForm] = useState(getBotonForm());

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickModulo = (modulo) => {
        setTipoElementoSeleccionado(tipoElemento.modulo);
        setModuloSeleccionado(modulo);
    };

    const handleClickPagina = (modulo, pagina) => {
        setTipoElementoSeleccionado(tipoElemento.pagina);
        setModuloSeleccionado(modulo);
        setPaginaSeleccionada(pagina);
    };

    const handleClickBoton = (modulo, pagina, boton) => {
        setTipoElementoSeleccionado(tipoElemento.boton);
        setModuloSeleccionado(modulo);
        setPaginaSeleccionada(pagina);
        setBotonSeleccionado(boton);
    };

    const handleCloseModuloForm = () => {
        setModalOpenModuloForm(false);
    };

    const handleClosePaginaForm = () => {
        setModalOpenPaginaForm(false);
    };

    const handleCloseBotonForm = () => {
        setModalOpenBotonForm(false);
    };

    const handleCloseEliminarModulo = () => {
        setModalOpenEliminarModulo(false);
    };

    const handleCloseEliminarPagina = () => {
        setModalOpenEliminarPagina(false);
    };

    const handleCloseEliminarBoton = () => {
        setModalOpenEliminarBoton(false);
    };

    const handleChangeModuloForm = (e) => {
        setModuloForm({
            ...moduloForm,
            [e.target.name]: {
                value: e.target.value,
                error: false,
            },
        });
    };

    const handleChangeModuloFormBool = (e) => {
        setModuloForm({
            ...moduloForm,
            [e.target.name]: e.target.checked,
        });
    };

    const handleChangePaginaForm = (e) => {
        setPaginaForm({
            ...paginaForm,
            [e.target.name]: {
                value: e.target.value,
                error: false,
            },
        });
    };

    const handleChangePaginaFormBool = (e) => {
        setPaginaForm({
            ...paginaForm,
            [e.target.name]: e.target.checked,
        });
    };

    const handleChangeBotonForm = (e) => {
        setBotonForm({
            ...botonForm,
            [e.target.name]: {
                value: e.target.value,
                error: false,
            },
        });
    };

    const handleChangeBotonFormBool = (e) => {
        setBotonForm({
            ...botonForm,
            [e.target.name]: e.target.checked,
        });
    };

    const handleClickCrearModulo = () => {
        setAnchorEl(null);
        setModuloForm(getModuloForm());
        setEdicionModulo(false);
        setModalOpenModuloForm(true);
    };

    const handleClickCrearPagina = () => {
        if (!moduloSeleccionado) {
            return;
        }

        setAnchorEl(null);
        setPaginaForm(getPaginaForm());
        setEdicionPagina(false);
        setModalOpenPaginaForm(true);
    };

    const handleClickCrearBoton = () => {
        if (!moduloSeleccionado || !paginaSeleccionada) {
            return;
        }

        setAnchorEl(null);
        setBotonForm(getBotonForm());
        setEdicionBoton(false);
        setModalOpenBotonForm(true);
    };

    const handleClickEditarModulo = () => {
        if (!moduloSeleccionado) {
            return;
        }

        setAnchorEl(null);

        const form = getModuloForm();
        form.claveModulo.value = isNullOrEmpty(moduloSeleccionado.claveModulo) ? "" : moduloSeleccionado.claveModulo;
        form.nombreModulo.value = isNullOrEmpty(moduloSeleccionado.nombreModulo) ? "" : moduloSeleccionado.nombreModulo;
        form.pathModulo.value = isNullOrEmpty(moduloSeleccionado.pathModulo) ? "" : moduloSeleccionado.pathModulo;
        form.mostrarEnMenu = !moduloSeleccionado.mostrarEnMenu ? false : moduloSeleccionado.mostrarEnMenu;
        setModuloForm(form);
        setEdicionModulo(true);
        setModalOpenModuloForm(true);
    };

    const handleClickEditarPagina = () => {
        if (!moduloSeleccionado || !paginaSeleccionada) {
            return;
        }

        setAnchorEl(null);

        const form = getPaginaForm();
        form.clavePagina.value = isNullOrEmpty(paginaSeleccionada.clavePagina) ? "" : paginaSeleccionada.clavePagina;
        form.nombrePagina.value = isNullOrEmpty(paginaSeleccionada.nombrePagina) ? "" : paginaSeleccionada.nombrePagina;
        form.pathPagina.value = isNullOrEmpty(paginaSeleccionada.pathPagina) ? "" : paginaSeleccionada.pathPagina;
        form.mostrarEnMenu = !paginaSeleccionada.mostrarEnMenu ? false : paginaSeleccionada.mostrarEnMenu;
        setPaginaForm(form);
        setEdicionPagina(true);
        setModalOpenPaginaForm(true);
    };

    const handleClickEditarBoton = () => {
        if (!moduloSeleccionado || !paginaSeleccionada || !botonSeleccionado) {
            return;
        }

        setAnchorEl(null);

        const form = getBotonForm();
        form.claveBoton.value = isNullOrEmpty(botonSeleccionado.claveBoton) ? "" : botonSeleccionado.claveBoton;
        form.nombreBoton.value = isNullOrEmpty(botonSeleccionado.nombreBoton) ? "" : botonSeleccionado.nombreBoton;
        setBotonForm(form);
        setEdicionBoton(true);
        setModalOpenBotonForm(true);
    };

    const handleClickEliminarModulo = () => {
        if (!moduloSeleccionado) {
            return;
        }

        setAnchorEl(null);
        setModalOpenEliminarModulo(true);
    };

    const handleClickEliminarPagina = () => {
        if (!moduloSeleccionado || !paginaSeleccionada) {
            return;
        }

        setAnchorEl(null);
        setModalOpenEliminarPagina(true);
    };

    const handleClickEliminarBoton = () => {
        if (!moduloSeleccionado || !paginaSeleccionada || !botonSeleccionado) {
            return;
        }

        setAnchorEl(null);
        setModalOpenEliminarBoton(true);
    };

    const handleClickGetElementos = async () => {
        const response = await GetRequest({
            url: apiConfiguracionElementos,
            loader: "Consultando elementos del sistema...",
        });

        if (response.hasError) {
            handleOpenAlert(response.message, "error");
            return;
        }

        setElements(response.result);
    };

    const handleSubmitModuloForm = async () => {
        const { nombreModulo, claveModulo, pathModulo, mostrarEnMenu } = moduloForm;
        const form = {
            ...moduloForm,
            nombreModulo: {
                ...nombreModulo,
                error: isNullOrEmpty(nombreModulo.value),
            },
            claveModulo: {
                ...claveModulo,
                error: isNullOrEmpty(claveModulo.value),
            },
            pathModulo: {
                ...pathModulo,
                error: isNullOrEmpty(pathModulo.value),
            },
        };
        setModuloForm(form);
        if (isErrorForm(form)) {
            return;
        }

        const moduloCreacion = {
            claveModulo: claveModulo.value,
            nombreModulo: nombreModulo.value,
            pathModulo: pathModulo.value,
            mostrarEnMenu,
        };

        if (!edicionModulo) {
            const response = await PostRequest({
                url: apiModulo,
                body: moduloCreacion,
                loader: "Creando módulo...",
                alert: true,
            });

            if (response.hasError) {
                return;
            }

            setModuloSeleccionado(response.result);
        } else {
            if (!moduloSeleccionado) {
                return;
            }

            const response = await PutRequest({
                url: apiModuloId.replace("{idModulo}", moduloSeleccionado.idModulo),
                body: moduloCreacion,
                loader: "Actualizando módulo...",
                alert: true,
            });

            if (response.hasError) {
                return;
            }

            setModuloSeleccionado(response.result);
        }

        setModalOpenModuloForm(false);
        await handleClickGetElementos();
    };

    const handleSubmitPaginaForm = async () => {
        const { nombrePagina, clavePagina, pathPagina, mostrarEnMenu } = paginaForm;
        const form = {
            ...paginaForm,
            nombrePagina: {
                ...nombrePagina,
                error: isNullOrEmpty(nombrePagina.value),
            },
            clavePagina: {
                ...clavePagina,
                error: isNullOrEmpty(clavePagina.value),
            },
            pathPagina: {
                ...pathPagina,
                error: isNullOrEmpty(pathPagina.value),
            },
        };
        setPaginaForm(form);
        if (isErrorForm(form)) {
            return;
        }

        const paginaCreacion = {
            clavePagina: clavePagina.value,
            nombrePagina: nombrePagina.value,
            pathPagina: pathPagina.value,
            mostrarEnMenu,
        };

        if (!edicionPagina) {
            const response = await PostRequest({
                url: apiPagina.replace("{idModulo}", moduloSeleccionado.idModulo),
                body: paginaCreacion,
                loader: "Creando página...",
                alert: true,
            });

            if (response.hasError) {
                return;
            }

            setPaginaSeleccionada(response.result);
        } else {
            if (!paginaSeleccionada) {
                return;
            }

            const response = await PutRequest({
                url: apiPaginaId
                    .replace("{idModulo}", moduloSeleccionado.idModulo)
                    .replace("{idPagina}", paginaSeleccionada.idPagina),
                body: paginaCreacion,
                loader: "Actualizando página...",
                alert: true,
            });

            if (response.hasError) {
                return;
            }

            setPaginaSeleccionada(response.result);
        }

        setModalOpenPaginaForm(false);
        await handleClickGetElementos();
    };

    const handleSubmitBotonForm = async () => {
        const { claveBoton, nombreBoton } = botonForm;
        const form = {
            ...botonForm,
            nombreBoton: {
                ...nombreBoton,
                error: isNullOrEmpty(nombreBoton.value),
            },
            claveBoton: {
                ...claveBoton,
                error: isNullOrEmpty(claveBoton.value),
            },
        };
        setBotonForm(form);
        if (isErrorForm(form)) {
            return;
        }

        const botonCreacion = {
            claveBoton: claveBoton.value,
            nombreBoton: nombreBoton.value,
        };

        if (!edicionBoton) {
            const response = await PostRequest({
                url: apiBoton
                    .replace("{idModulo}", moduloSeleccionado.idModulo)
                    .replace("{idPagina}", paginaSeleccionada.idPagina),
                body: botonCreacion,
                loader: "Creando botón...",
                alert: true,
            });

            if (response.hasError) {
                return;
            }

            setBotonSeleccionado(response.result);
        } else {
            if (!botonSeleccionado) {
                return;
            }

            const response = await PutRequest({
                url: apiBotonId
                    .replace("{idModulo}", moduloSeleccionado.idModulo)
                    .replace("{idPagina}", paginaSeleccionada.idPagina)
                    .replace("{idBoton}", botonSeleccionado.idBoton),
                body: botonCreacion,
                loader: "Actualizando botón...",
                alert: true,
            });

            if (response.hasError) {
                return;
            }

            setBotonSeleccionado(response.result);
        }

        setModalOpenBotonForm(false);
        await handleClickGetElementos();
    };

    const handleSubmitEliminarModulo = async () => {
        const response = await DeleteRequest({
            url: apiModuloId.replace("{idModulo}", moduloSeleccionado.idModulo),
            loader: "Eliminando módulo...",
            alert: true,
        });

        if (response.hasError) {
            return;
        }

        setModalOpenEliminarModulo(false);
        setModuloSeleccionado(null);
        setTipoElementoSeleccionado(tipoElemento.none);
        await handleClickGetElementos();
    };

    const handleSubmitEliminarPagina = async () => {
        const response = await DeleteRequest({
            url: apiPaginaId
                .replace("{idModulo}", moduloSeleccionado.idModulo)
                .replace("{idPagina}", paginaSeleccionada.idPagina),
            loader: "Eliminando página...",
            alert: true,
        });

        if (response.hasError) {
            return;
        }

        setModalOpenEliminarPagina(false);
        setPaginaSeleccionada(null);
        setTipoElementoSeleccionado(tipoElemento.none);
        await handleClickGetElementos();
    };

    const handleSubmitEliminarBoton = async () => {
        const response = await DeleteRequest({
            url: apiBotonId
                .replace("{idModulo}", moduloSeleccionado.idModulo)
                .replace("{idPagina}", paginaSeleccionada.idPagina)
                .replace("{idBoton}", botonSeleccionado.idBoton),
            loader: "Eliminando botón...",
            alert: true,
        });

        if (response.hasError) {
            return;
        }

        setModalOpenEliminarBoton(false);
        setBotonSeleccionado(null);
        setTipoElementoSeleccionado(tipoElemento.none);
        await handleClickGetElementos();
    };

    return (
        <SistemaContext.Provider
            value={{
                elements,
                anchorEl,
                tipoElementoSeleccionado,
                moduloSeleccionado,
                paginaSeleccionada,
                botonSeleccionado,
                modalOpenModuloForm,
                modalOpenPaginaForm,
                modalOpenBotonForm,
                modalOpenEliminarModulo,
                modalOpenEliminarPagina,
                modalOpenEliminarBoton,
                edicionModulo,
                edicionPagina,
                edicionBoton,
                moduloForm,
                paginaForm,
                botonForm,
                open,
                handleClick,
                handleClose,
                handleClickModulo,
                handleClickPagina,
                handleClickBoton,
                handleCloseModuloForm,
                handleClosePaginaForm,
                handleCloseBotonForm,
                handleCloseEliminarModulo,
                handleCloseEliminarPagina,
                handleCloseEliminarBoton,
                handleChangeModuloForm,
                handleChangeModuloFormBool,
                handleChangePaginaForm,
                handleChangePaginaFormBool,
                handleChangeBotonForm,
                handleChangeBotonFormBool,
                handleClickCrearModulo,
                handleClickCrearPagina,
                handleClickCrearBoton,
                handleClickEditarModulo,
                handleClickEditarPagina,
                handleClickEditarBoton,
                handleClickEliminarModulo,
                handleClickEliminarPagina,
                handleClickEliminarBoton,
                handleClickGetElementos,
                handleSubmitModuloForm,
                handleSubmitPaginaForm,
                handleSubmitBotonForm,
                handleSubmitEliminarModulo,
                handleSubmitEliminarPagina,
                handleSubmitEliminarBoton,
            }}
        >
            {props.children}
        </SistemaContext.Provider>
    );
};

export const useSistema = () => useContext(SistemaContext);
