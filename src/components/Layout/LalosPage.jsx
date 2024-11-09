import { Route, Routes } from "react-router-dom";

import LalosAlert from "../LalosAlert";
import LalosAppBar from "./LalosAppBar";
import LalosDashboardV2 from "./LalosDashboardV2";
import LalosFooter from "./LalosFooter";
import LalosLoader from "../LalosLoader";
import LalosLoandingPage from "./LalosLoadingPage";
import LalosLogin from "../../pages/Seguridad/LalosLogin";
import Invitados from "../../pages/Boda/Invitados/Invitados";
import { ThemeProvider } from "@mui/material";
import { routeLogin,routeInvitatados } from "../../settings/routeConfig";
import { useConfiguration } from "../../context/System/ConfigurationContext";
import { useSession } from "../../context/System/SessionContext";

export default function LalosPage() {
  const { theme } = useConfiguration();
  const { usuarioEnSesion } = useSession();

  return (
    <ThemeProvider theme={theme}>
      <div className="pizzeria-dashboard">
        {usuarioEnSesion && <LalosAppBar />}
        <div className="content">
          <Routes>
            <Route path={routeLogin} element={<LalosLogin />} />
            <Route path="/*" element={usuarioEnSesion ? <LalosDashboardV2 /> : <LalosLoandingPage />} />
           
            <Route path={routeInvitatados} element={<Invitados />} />
          </Routes>
        </div>
        <LalosFooter />
      </div>
      <LalosAlert/>
      <LalosLoader />
    </ThemeProvider>
  );
}
