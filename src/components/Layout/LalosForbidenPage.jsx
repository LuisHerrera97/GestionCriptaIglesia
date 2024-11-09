import { Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

import GppBadIcon from "@mui/icons-material/GppBad";
import LalosLayout from "../LalosLayout";

export default function LalosForbidenPage() {
    return (
        <LalosLayout titlePage="NO AUTORIZADO">
            <Grid container>
                <Grid size={{ xs: 12}} className="center">
                    <GppBadIcon fontSize="large" color="primary" />
                    <Typography>
                        El usuario no cuenta con los permisos necesarios para acceder a este recurso
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12}} className="center"></Grid>
            </Grid>
        </LalosLayout>
    );
}
