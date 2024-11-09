import { createContext, useContext, useState } from "react";

import { apiConfiguracion } from "../../settings/apiConfig";
import { isNullOrEmpty } from "../../settings/utils";
import { useLayout } from "../System/LayoutContext";
import { useRequest } from "../System/RequestContext";

const getConfiguracionForm = () => ({
    tituloNavegador: { value: "", error: false },
    metaDescription: { value: "", error: false },
    colorPrimario: { value: "", error: false },
    colorSecundario: { value: "", error: false },
    contrastePrimario: { value: "", error: false },
    contrasteSecundario: { value: "", error: false },
    urlFuente: { value: "", error: false },
    nombreFuente: { value: "", error: false },
    rutaImagenFondo: { value: "", error: false },
    rutaImagenLogo: { value: "", error: false },
    rutaImagenPortal: { value: "", error: false },
});

export const ConfiguracionGeneralContext = createContext();

export const ConfiguracionGeneralProvider = (props) => {
    const { GetRequest, PostRequest } = useRequest();
    const { handleOpenAlert } = useLayout();

    const [configuracionForm, setConfiguracionForm] = useState(getConfiguracionForm());

    const handleClickObtenerConfiguracion = async () => {
        const response = await GetRequest({
            url: apiConfiguracion,
            loader: "Obteniendo configuración",
        });

        if (response.hasError) {
            handleOpenAlert(response.message);
            return;
        }

        const {
            colorPrimario,
            colorSecundario,
            contrastePrimario,
            contrasteSecundario,
            metaDescription,
            nombreFuente,
            rutaImagenFondo,
            rutaImagenLogo,
            rutaImagenPortal,
            tituloNavegador,
            urlFuente,
        } = response.result;

        const form = getConfiguracionForm();
        form.colorPrimario.value = isNullOrEmpty(colorPrimario) ? "" : colorPrimario;
        form.colorSecundario.value = isNullOrEmpty(colorSecundario) ? "" : colorSecundario;
        form.contrastePrimario.value = isNullOrEmpty(contrastePrimario) ? "" : contrastePrimario;
        form.contrasteSecundario.value = isNullOrEmpty(contrasteSecundario) ? "" : contrasteSecundario;
        form.metaDescription.value = isNullOrEmpty(metaDescription) ? "" : metaDescription;
        form.nombreFuente.value = isNullOrEmpty(nombreFuente) ? "" : nombreFuente;
        form.rutaImagenFondo.value = isNullOrEmpty(rutaImagenFondo) ? "" : rutaImagenFondo;
        form.rutaImagenLogo.value = isNullOrEmpty(rutaImagenLogo) ? "" : rutaImagenLogo;
        form.rutaImagenPortal.value = isNullOrEmpty(rutaImagenPortal) ? "" : rutaImagenPortal;
        form.tituloNavegador.value = isNullOrEmpty(tituloNavegador) ? "" : tituloNavegador;
        form.urlFuente.value = isNullOrEmpty(urlFuente) ? "" : urlFuente;

        setConfiguracionForm(form);
    };

    const handleChangeConfiguracionForm = (e) => {
        setConfiguracionForm({
            ...configuracionForm,
            [e.target.name]: {
                value: e.target.value,
                error: false,
            },
        });
    };

    const handleClickGuardarConfiguracion = async () => {
        const {
            colorPrimario,
            colorSecundario,
            contrastePrimario,
            contrasteSecundario,
            metaDescription,
            nombreFuente,
            rutaImagenFondo,
            rutaImagenLogo,
            rutaImagenPortal,
            tituloNavegador,
            urlFuente,
        } = configuracionForm;

        const configuracionModel = {
            tituloNavegador: tituloNavegador.value,
            metaDescription: metaDescription.value,
            colorPrimario: colorPrimario.value,
            colorSecundario: colorSecundario.value,
            contrastePrimario: contrastePrimario.value,
            contrasteSecundario: contrasteSecundario.value,
            urlFuente: urlFuente.value,
            nombreFuente: nombreFuente.value,
            rutaImagenFondo: rutaImagenFondo.value,
            rutaImagenLogo: rutaImagenLogo.value,
            rutaImagenPortal: rutaImagenPortal.value,
        };

        const response = await PostRequest({
            url: apiConfiguracion,
            loader: "Guardando configuración...",
            body: configuracionModel,
            alert: true,
        });

        if (response.hasError) {
            return;
        }

        window.location.reload();
    };

    return (
        <ConfiguracionGeneralContext.Provider
            value={{
                configuracionForm,
                handleChangeConfiguracionForm,
                handleClickObtenerConfiguracion,
                handleClickGuardarConfiguracion,
            }}
        >
            {props.children}
        </ConfiguracionGeneralContext.Provider>
    );
};

export const useConfiguracionGeneral = () => useContext(ConfiguracionGeneralContext);
