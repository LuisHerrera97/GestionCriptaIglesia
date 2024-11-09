import { AppBar, Paper, Typography } from "@mui/material";

import { Box } from "@mui/system";
import PropTypes from "prop-types";

const paperPadding = 2;

const LalosCard = (props) => {
    return (
        <Paper style={{ height: "100%" }}>
            <AppBar
                color={!props.color ? "default" : props.color}
                position="static"
                variant="outlined"
                sx={{ borderRadius: "4px 4px 0px 0px" }}
            >
                <Typography variant="h6" sx={{ ml: 1, mr: 1 }}>
                    {props.title}
                </Typography>
            </AppBar>
            <Box p={!props.padding && props.padding !== 0 ? paperPadding : props.padding}>{props.children}</Box>
        </Paper>
    );
};

LalosCard.propTypes = {
    children: PropTypes.any,
    color: PropTypes.any,
    padding: PropTypes.any,
    title: PropTypes.any,
};

export default LalosCard;
