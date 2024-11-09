import { createContext, useContext, useState } from "react";

import { apiUsuarioId } from "../../settings/apiConfig";
import { isNullOrEmpty, isErrorForm } from "../../settings/utils";
import { useLayout } from "../System/LayoutContext";
import { useRequest } from "../System/RequestContext";
import { useSession } from "../System/SessionContext";

const getcambioContraseniaForm = () => ({
  contraseniaActual: { value: "", error: false },
  contraseniaNueva: { value: "", error: false },
});

export const ContraseniaContext = createContext();

export const ContraseniaProvider = (props) => {
  const { PutRequest } = useRequest();
  const { handleOpenAlert } = useLayout();
  const { usuario } = useSession();

  const [cambioContraseniaForm, setcambioContraseniaForm] = useState(getcambioContraseniaForm());

  const handleChangecambioContrasenia = (e) => {
    setcambioContraseniaForm({
      ...cambioContraseniaForm,
      [e.target.name]: {
        value: e.target.value,
        error: false,
      },
    });
  };

  const handleSubmitcambioContrasenia = async () => {
    const { contraseniaActual, contraseniaNueva } = cambioContraseniaForm;

    const form = {
      ...cambioContraseniaForm,
      contraseniaActual: {
        ...contraseniaActual,
        error: isNullOrEmpty(contraseniaActual.value),
      },
      contraseniaNueva: {
        ...contraseniaNueva,
        error: isNullOrEmpty(contraseniaNueva.value),
      },
    };

    setcambioContraseniaForm(form);
    if (isErrorForm(form)) {
      handleOpenAlert("Error en formulario");
      return;
    }

    const contraseniaModel = {
      password: contraseniaNueva.value,
      email: usuario.email,
      idPerfil: usuario.idPerfil,
      username: usuario.username,
      nombres: usuario.nombres,
      idPersona: usuario.idPersona,
      tieneAcceso: usuario.tieneAcceso,
    };

    const response = await PutRequest({
      url: apiUsuarioId.replace("{idUsuario}", usuario.idUsuario),
      loader: "Guardando contraseña nueva...",
      body: contraseniaModel,
      alert: true,
    });

    if (response.hasError) {
      handleOpenAlert(response.message);
      return;
    }

    window.location.reload();
  };

  return (
    <ContraseniaContext.Provider
      value={{
        cambioContraseniaForm,
        handleChangecambioContrasenia,
        handleSubmitcambioContrasenia,
      }}
    >
      {props.children}
    </ContraseniaContext.Provider>
  );
};

export const useContrasenia = () => useContext(ContraseniaContext);
