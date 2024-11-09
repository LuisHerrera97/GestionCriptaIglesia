import { apiLogin,serverMiddleware } from "../../settings/apiConfig";
import { createContext, useContext, useEffect, useState } from "react";
import { isErrorForm, isNullOrEmpty } from "../../settings/utils";
import { routeLogin,routeRoot,routeInvitatados } from "../../settings/routeConfig";
import { useLocation, useNavigate } from "react-router-dom";

import { useConfiguration } from "./ConfigurationContext";
import { useLayout } from "./LayoutContext";
import { tiempoCierreSession } from "../../settings/utils";

export const tokenName = "pizzeria-dashboard-token";

const getLoginForm = () => ({
  username: { value: "", error: false },
  password: { value: "", error: false }
});

const getConfiguracionDefault = () => ({
  tituloNavegador: "Pizzeria Lalos",
  tituloDependencia: "Sistema de ventas",
  metaDescription: "Sistema de ventas",
  colorPrimario: "#FD8204",
  colorSecundario: "#16216A",
  contrastePrimario: "#FFFFFF",
  contrasteSecundario: "#FFFFFF",
  urlFuente: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap",
  nombreFuente: "Roboto",
  rutaImagenFondo: "",
  rutaImagenLogo: "",
  rutaImagenPortal: "",
});

export const SessionContext = createContext();

export const SessionProvider = (props) => {
  const { handleOpenAlert, handleOpenLoader, handleCloseLoader } = useLayout();
  const { handleChangeConfiguration } = useConfiguration();
  const location = useLocation();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState("");
  const [permisosModulos, setPermisosModulos] = useState([]);
  const [permisosPaginas, setPermisosPaginas] = useState([]);
  const [permisosBotones, setPermisosBotones] = useState([]);
  const [configuracion, setConfiguracion] = useState(getConfiguracionDefault());
  const [definicionMenu, setDefinicionMenu] = useState(null);

  const [usuarioEnSesion, setUsuarioEnSesion] = useState(false);
  const [loginForm, setLoginForm] = useState(getLoginForm());
  const [previousRoute, setPreviousRoute] = useState("");

  const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
  ];
  let timer;
  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer();
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      handleClickCerrarSesion();
    }, tiempoCierreSession);
  };
  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  const handleChangeLoginForm = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: {
        value: e.target.value,
        error: false,
      },
    });
  };

  const handleClickCerrarSesion = () => {
    setToken("");
    setPermisosModulos([]);
    setPermisosPaginas([]);
    setPermisosBotones([]);
    setConfiguracion(getConfiguracionDefault());
    setUsuarioEnSesion(false);
    setLoginForm(getLoginForm());

    localStorage.removeItem(tokenName);

    setPreviousRoute(location.pathname);
    navigate(routeInvitatados);
    setUsuario(null);
  };

  const handleSubmitLoginForm = async (e) => {
    e.preventDefault();
    const {password, username } = loginForm;

    const form = {
      ...loginForm,
      password: { ...password, error: password.value === "" },
      username: { ...username, error: username.value === "" }
    };
    setLoginForm(form);
    if (isErrorForm(form)) {
      return;
    }

    const loginRequest = {
      usuario: username.value,
      password: password.value
    };

    try {
      handleOpenLoader("");

      const loginResponse = await fetch(serverMiddleware + apiLogin, {
        method: "POST",
        body: JSON.stringify(loginRequest),
        headers: {
          "content-type": "application/json",
        },
      });
      handleCloseLoader();
      const response = await loginResponse.json();

      if (response.hasError) {
        handleOpenAlert(response.message, "error");
        return;
      }

      saveLoginResponse(response);
    } catch (error) {
      handleCloseLoader();
      handleOpenAlert("Ocurrió un error inesperado al intentar validar las credenciales", "error");
    }
  };

  const handleOnLoadToken = async () => {
    const currentToken = localStorage.getItem(tokenName);
    if (isNullOrEmpty(currentToken)) {
      handleClickCerrarSesion();
      return;
    }

    /*try {
      handleOpenLoader("");
      const loginResponse = await fetch(
        serverMiddleware +
        apiLoginEjercicio.replace(
          "{ejercicioPresupuestal}",
          ejercicioPrespuestalDashboard === "" ? new Date().getFullYear().toString() : ejercicioPrespuestalDashboard
        ),
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: "Bearer " + currentToken,
          },
        }
      );

      handleCloseLoader();

      if (!loginResponse.ok) {
        handleClickCerrarSesion();
        return;
      }

      const response = await loginResponse.json();

      if (response.hasError) {
        handleClickCerrarSesion();
        return;
      }

      saveLoginResponse(response);
    } catch (error) {
      handleCloseLoader();
      handleClickCerrarSesion();
    }*/
  };

  const saveLoginResponse = (loginResponse) => {

    localStorage.setItem(tokenName, loginResponse.result.token);

    setUsuario(loginResponse.result.usuario);
    setToken(loginResponse.result.token);
    setPermisosModulos(loginResponse.result.permisosModulos);
    setPermisosPaginas(loginResponse.result.permisosPaginas);
    setPermisosBotones(loginResponse.result.permisosBotones);
    setDefinicionMenu(loginResponse.result.menu);
    setConfiguracion(loginResponse.result.configuracion);
    setUsuarioEnSesion(true);

    if (previousRoute === routeLogin) {
      navigate(routeRoot, { replace: true });
      return;
    }

    if (!isNullOrEmpty(previousRoute)) {
      navigate(previousRoute, { replace: true });
    }
  };

  const getPermisoBoton = (clave) => {
    const boton = permisosBotones.find((x) => x.claveBoton === clave);
    return !boton ? false : boton.tienePermiso;
  };

  const getNombreBoton = (clave) => {
    const boton = permisosBotones.find((x) => x.claveBoton === clave);
    return !boton ? null : boton.nombreBoton;
  };

  const getPermisoPagina = (clave) => {
    const pagina = permisosPaginas.find((x) => x.clavePagina === clave);
    return !pagina ? false : pagina.tienePermiso;
  };

  const getNombrePagina = (clave) => {
    const pagina = permisosPaginas.find((x) => x.clavePagina === clave);
    return !pagina ? null : pagina.nombrePagina;
  };

  const getPermisoModulo = (clave) => {
    const modulo = permisosModulos.find((x) => x.claveModulo === clave);
    return !modulo ? false : modulo.tienePermiso;
  };

  const getNombreModulo = (clave) => {
    const modulo = permisosModulos.find((x) => x.claveModulo === clave);
    return !modulo ? null : modulo.nombreModulo;
  };

  useEffect(() => {
    if (!configuracion) {
      return;
    }

    handleChangeConfiguration(
      configuracion.urlFuente,
      configuracion.nombreFuente,
      configuracion.colorPrimario,
      configuracion.colorSecundario,
      configuracion.contrastePrimario,
      configuracion.contrasteSecundario,
      configuracion.tituloNavegador,
      configuracion.metaDescription
    );
  }, [configuracion]);

  useEffect(() => {
    handleOnLoadToken();
    //eslint-disable-next-line

    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
  }, []);

  const handleClickRegresarLogin = async (e) => {
    navigate(routeLogin);
  };
  return (
    <SessionContext.Provider
      value={{
        usuario,
        token,
        permisosModulos,
        permisosPaginas,
        permisosBotones,
        usuarioEnSesion,
        configuracion,
        loginForm,
        previousRoute,
        definicionMenu,
        handleChangeLoginForm,
        handleSubmitLoginForm,
        handleOnLoadToken,
        handleClickCerrarSesion,
        getPermisoBoton,
        getNombreBoton,
        getPermisoPagina,
        getNombrePagina,
        getPermisoModulo,
        getNombreModulo,
        handleClickRegresarLogin
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
