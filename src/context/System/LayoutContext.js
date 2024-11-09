import { createContext, useContext, useState } from "react";

import { useConfiguration } from "./ConfigurationContext";
import { useNavigate } from "react-router-dom";

export const LayoutContext = createContext();

export const LayoutProvider = (props) => {
    const navigate = useNavigate();
    const { titlePage } = useConfiguration();
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        severity: "error",
    });

    const [loader, setLoader] = useState({
        open: false,
        message: "Loading...",
    });

    const [menuClientOpen, setMenuClientOpen] = useState(false);
    const [menuDashboardOpen, setMenuDashboardOpen] = useState(true);

    const [detailDashboardOpen, setDetailDashboardOpen] = useState(true);
    const [clavePaginaActual, setClavePaginaActual] = useState("");

    const handleOpenDetailDashboard = () => {
        setDetailDashboardOpen(true);
    };

    const handleCloseDetailDashboard = () => {
        setDetailDashboardOpen(false);
    };

    const handleOpenMenuClient = () => {
        setMenuClientOpen(true);
    };

    const handleCloseMenuClient = () => {
        setMenuClientOpen(false);
    };

    const handleOpenMenuDashboard = () => {
        setMenuDashboardOpen(true);
    };

    const handleCloseMenuDashboard = () => {
        setMenuDashboardOpen(false);
    };

    const handleOpenAlert = (message, severity = "error") => {
        setAlert({
            open: true,
            message,
            severity,
        });
    };

    const handleCloseAlert = () => {
        setAlert({
            ...alert,
            open: false,
        });
    };

    const handleOpenLoader = (message) => {
        setLoader({
            open: true,
            message,
        });
    };

    const handleCloseLoader = () => {
        setLoader({
            ...loader,
            open: false,
        });
    };

    const handleClickGoTo = (value) => {
        navigate(value);
    };

    const handleChangeTitle = (value) => {
        document.querySelector("title").innerHTML = titlePage + " - " + value;
    };

    const handleChangeClavePaginaActual = (value) => {
        setClavePaginaActual(value);
    };

    return (
        <LayoutContext.Provider
            value={{
                alert,
                loader,
                menuClientOpen,
                menuDashboardOpen,
                detailDashboardOpen,
                clavePaginaActual,
                handleOpenDetailDashboard,
                handleCloseDetailDashboard,
                handleOpenMenuDashboard,
                handleCloseMenuDashboard,
                handleOpenMenuClient,
                handleCloseMenuClient,
                handleOpenAlert,
                handleCloseAlert,
                handleOpenLoader,
                handleCloseLoader,
                handleClickGoTo,
                handleChangeTitle,
                handleChangeClavePaginaActual
            }}
        >
            {props.children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => useContext(LayoutContext);
