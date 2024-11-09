import { apiUsuario, apiUsuarioId } from "../../settings/apiConfig";
import { createContext, useContext, useState } from "react";
import { ValoresGenericos, isErrorForm, isNullOrEmpty } from "../../settings/utils";

import { rxCorreo } from "../../settings/regexConfig";
import { useLayout } from "../System/LayoutContext";
import { usePerfil } from "./PerfilContext";
import { useRequest } from "../System/RequestContext";

const getUsuarioForm = () => ({
    idPerfil: { value: "", error: false },
    username: { value: "", error: false },
    password: { value: "", error: false },
    nombres: { value: "", error: false },
    apellidos: { value: "", error: false },
    email: { value: "", error: false },
    telefono: { value: "", error: false },
    tieneAcceso: true,
    eliminable: true,
    crearPersona: true,
    idArea: { value: "", error: false },
    idPersona: { value: "", error: false },
});

export const UsuarioContext = createContext();

export const UsuarioProvider = (props) => {
    const { GetRequest, PostRequest, PutRequest, DeleteRequest } = useRequest();
    const { handleOpenAlert } = useLayout();
    const { handleClickObtenerPerfiles } = usePerfil();

    const [listaUsuarios, setListaUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [usuarioForm, setUsuarioForm] = useState(getUsuarioForm());
    const [edicionUsuario, setEdicionUsuario] = useState(false);
    const [modalOpenUsuarioForm, setModalOpenUsuarioForm] = useState(false);
    const [modalOpenEliminarUsuario, setModalOpenEliminarUsuario] = useState(false);

    const handleCloseUsuarioForm = () => {
        setModalOpenUsuarioForm(false);
    };

    const handleCloseEliminarUsuario = () => {
        setModalOpenEliminarUsuario(false);
    };

    const handleChangeUsuarioForm = (e) => {
        setUsuarioForm({
            ...usuarioForm,
            [e.target.name]: {
                value: e.target.value,
                error: false,
            },
        });
    };

    const handleChangeUsuarioFormBool = (e) => {
        setUsuarioForm({
            ...usuarioForm,
            [e.target.name]: e.target.checked,
        });
    };

    const handleChangeUsuarioSeleccionado = (value) => {
        setUsuarioSeleccionado(value);
    };

    const handleClickCrearUsuario = () => {
        setUsuarioForm(getUsuarioForm());
        setEdicionUsuario(false);
        setModalOpenUsuarioForm(true);
    };

    const handleClickEditarUsuario = () => {
        if (!usuarioSeleccionado) {
            return;
        }

        const form = getUsuarioForm();
        form.apellidos.value = isNullOrEmpty(usuarioSeleccionado.apellidos) ? "" : usuarioSeleccionado.apellidos;
        form.email.value = isNullOrEmpty(usuarioSeleccionado.email) ? "" : usuarioSeleccionado.email;
        form.idPerfil.value = isNullOrEmpty(usuarioSeleccionado.idPerfil) ? "" : usuarioSeleccionado.idPerfil;
        form.idArea.value = isNullOrEmpty(usuarioSeleccionado.idArea) ? "" : usuarioSeleccionado.idArea;
        form.idPersona.value = isNullOrEmpty(usuarioSeleccionado.idPersona) ? "" : usuarioSeleccionado.idPersona;
        form.nombres.value = isNullOrEmpty(usuarioSeleccionado.nombres) ? "" : usuarioSeleccionado.nombres;
        form.password.value = isNullOrEmpty(usuarioSeleccionado.password) ? "" : usuarioSeleccionado.password;
        form.telefono.value = isNullOrEmpty(usuarioSeleccionado.telefono) ? "" : usuarioSeleccionado.telefono;
        form.username.value = isNullOrEmpty(usuarioSeleccionado.username) ? "" : usuarioSeleccionado.username;
        form.tieneAcceso = !usuarioSeleccionado.tieneAcceso ? false : usuarioSeleccionado.tieneAcceso;
        form.eliminable = !usuarioSeleccionado.eliminable ? false : usuarioSeleccionado.eliminable;
        form.crearPersona = !!form.idArea.value;

        setUsuarioForm(form);
        setEdicionUsuario(true);
        setModalOpenUsuarioForm(true);
    };

    const handleClickEliminarUsuario = () => {
        if (!usuarioSeleccionado) {
            return;
        }

        if (!usuarioSeleccionado.eliminable) {
            handleOpenAlert(
                "El usuario seleccionado no puede eliminarse debido a que es un usuario del sistema",
                "warning"
            );
            return;
        }

        setModalOpenEliminarUsuario(true);
    };

    const handleClickObtenerUsuarios = async () => {
        const response = await GetRequest({
            url: apiUsuario,
            loader: "Consultando usuarios...",
        });

        if (response.hasError) {
            setListaUsuarios([]);
            handleOpenAlert(response.message);
            return [];
        }

        setListaUsuarios(response.result);
        return response.result;
    };

    const handleClickRefrescarDatos = () => {
        handleClickObtenerPerfiles();
        handleClickObtenerUsuarios();
    };

    const handleSubmitUsuarioForm = async () => {
        if (edicionUsuario && !usuarioSeleccionado) {
            return;
        }

        const {
            email,
            idPerfil,
            nombres,
            password,
            telefono,
            username,
            apellidos,
            tieneAcceso,
            crearPersona,
            idArea,
            idPersona,
        } = usuarioForm;

        const form = {
            ...usuarioForm,
            email: { ...email, error: isNullOrEmpty(email.value) || !rxCorreo.test(email.value) },
            idPerfil: { ...idPerfil, error: isNullOrEmpty(idPerfil.value) },
            nombres: { ...nombres, error: isNullOrEmpty(nombres.value) },
            password: { ...password, error: isNullOrEmpty(password.value) },
            telefono: { ...telefono, error: !isNullOrEmpty(telefono.value) && telefono.value.length !== 12 },
            username: { ...nombres, error: isNullOrEmpty(username.value) },
            idArea: { ...idArea, error: crearPersona && isNullOrEmpty(idArea.value) },
        };

        setUsuarioForm(form);
        if (isErrorForm(form)) {
            return;
        }

        const usuarioModel = {
            idPerfil: idPerfil.value,
            username: username.value,
            password: password.value,
            nombres: nombres.value,
            apellidos: apellidos.value,
            email: email.value,
            telefono: telefono.value,
            tieneAcceso,
            crearPersona,
            idArea: isNullOrEmpty(idArea.value) || !crearPersona ? ValoresGenericos.GUI_DEFAULT : idArea.value,
            idPersona: !idPersona.value ? ValoresGenericos.GUI_DEFAULT : idPersona.value,
        };

        const response = edicionUsuario
            ? await PutRequest({
                url: apiUsuarioId.replace("{idUsuario}", usuarioSeleccionado.idUsuario),
                loader: "Actualizando usuario...",
                body: usuarioModel,
                alert: true,
            })
            : await PostRequest({
                url: apiUsuario,
                loader: "Creando usuario...",
                body: usuarioModel,
                alert: true,
            });

        if (response.hasError) {
            return;
        }

        setModalOpenUsuarioForm(false);
        const newList = await handleClickObtenerUsuarios();
        const newUsuario = newList.find((x) => x.idUsuario === response.result.idUsuario);
        setUsuarioSeleccionado(newUsuario);
    };

    const handleSubmitEliminarUsuario = async () => {
        if (!usuarioSeleccionado) {
            return;
        }

        const response = await DeleteRequest({
            url: apiUsuarioId.replace("{idUsuario}", usuarioSeleccionado.idUsuario),
            loader: "Eliminando usuario...",
            alert: true,
        });

        if (response.hasError) {
            return;
        }

        setUsuarioSeleccionado(null);
        setModalOpenEliminarUsuario(false);
        await handleClickObtenerUsuarios();
    };

    return (
        <UsuarioContext.Provider
            value={{
                listaUsuarios,
                usuarioSeleccionado,
                usuarioForm,
                edicionUsuario,
                modalOpenUsuarioForm,
                modalOpenEliminarUsuario,
                handleCloseUsuarioForm,
                handleCloseEliminarUsuario,
                handleChangeUsuarioForm,
                handleChangeUsuarioFormBool,
                handleChangeUsuarioSeleccionado,
                handleClickCrearUsuario,
                handleClickEditarUsuario,
                handleClickEliminarUsuario,
                handleClickObtenerUsuarios,
                handleClickRefrescarDatos,
                handleSubmitUsuarioForm,
                handleSubmitEliminarUsuario,
            }}
        >
            {props.children}
        </UsuarioContext.Provider>
    );
};

export const useUsuario = () => useContext(UsuarioContext);
