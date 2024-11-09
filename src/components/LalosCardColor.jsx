import { AppBar, Paper, Typography, Toolbar } from "@mui/material";

import { Box } from "@mui/system";
import PropTypes from "prop-types";
const paperPadding = 2;

const LalosCardColor = (props) => {
    return (
        <Paper onClick={() =>
            props.funcion()
        } style={{ height: "100%" }}>
            <AppBar
                color={!props.color ? "default" : props.color}
                position="static"
                variant="outlined"
                sx={{ borderRadius: "4px 4px 0px 0px" }}
                style={{ paddingLeft: 10 }}
            >
                <Toolbar disableGutters>
                    {props.icono}
                    <Typography variant="h6" sx={{ ml: 1, mr: 1 }}>
                        {props.title}
                    </Typography>
                </Toolbar>



            </AppBar>
            <Box p={!props.padding && props.padding !== 0 ? paperPadding : props.padding}>{props.children}</Box>
        </Paper>
    );
};

LalosCardColor.propTypes = {
    children: PropTypes.any,
    color: PropTypes.any,
    padding: PropTypes.any,
    title: PropTypes.any,
};

export default LalosCardColor;
