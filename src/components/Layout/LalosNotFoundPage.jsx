import {Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

import LalosLayout from "../LalosLayout";
import LalosMenuV2 from "./LalosMenuV2";
import ReportIcon from "@mui/icons-material/Report";
import { useConfiguration } from "../../context/System/ConfigurationContext";

export default function LalosNotFoundPage() {
    const { theme } = useConfiguration();
    return (
        <LalosLayout titlePage="404">
            <Grid container>
                <Grid size={{ xs: 12}} className="center" style={{ marginTop: 50 }}>
                    <ReportIcon style={{ fontSize: 100, color: "lightgray" }} />
                    <Typography>No se encontró la página a la que intentas acceder</Typography>
                </Grid>
                <Grid size={{ xs: 12}} className="center">
                    <Typography>Puedes ingresar al contenido de tu perfil en las opciones del menú</Typography>
                </Grid>
                <Grid
                    size={{ xs: 12}}
                    className="center"
                    style={{
                        maxWidth: 500,
                        margin: "auto",
                        backgroundColor: theme.palette.secondary.main,
                        borderRadius: 10,
                        marginTop: 50,
                    }}
                >
                    <LalosMenuV2 />
                </Grid>
            </Grid>
        </LalosLayout>
    );
}
