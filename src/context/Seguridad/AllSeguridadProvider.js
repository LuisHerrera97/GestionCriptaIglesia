import { ConfiguracionGeneralProvider } from "./ConfiguracionGeneralContext";
import { PerfilProvider } from "./PerfilContext";
import { SistemaProvider } from "./SistemaContext";
import { UsuarioProvider } from "./UsuarioContext";
import { ContraseniaProvider } from "./ContraseniaContext";

export const AllSeguridadProvider = (props) => (
  <SistemaProvider>
    <PerfilProvider>
      <UsuarioProvider>
        <ConfiguracionGeneralProvider>
          <ContraseniaProvider>
            {props.children}
          </ContraseniaProvider>
        </ConfiguracionGeneralProvider>
      </UsuarioProvider>
    </PerfilProvider>
  </SistemaProvider>
);
