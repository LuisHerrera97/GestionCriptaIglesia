//import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AllSystemProvider } from "./context/System/AllSystemProvider";
import { AllBodaProvider } from "./context/Boda/AllBodaProvider";
import { BrowserRouter } from "react-router-dom";
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LalosPage from "./components/Layout/LalosPage"
import esLocale from "date-fns/locale/es";
import { routeBase } from "./settings/routeConfig";

export default function App() {
  return (
    <BrowserRouter>
      <AllSystemProvider>
        <AllBodaProvider>
          <LalosPage />
        </AllBodaProvider> 
      </AllSystemProvider>
    </BrowserRouter>
  );
}
