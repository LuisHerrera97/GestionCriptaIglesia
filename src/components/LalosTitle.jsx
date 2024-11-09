import { Divider, Typography } from "@mui/material";

import { Fragment } from "react";
import PropTypes from "prop-types";

export default function LalosTitle({ children, hideDivider }) {
    return (
        <Fragment>
            <Typography variant="h6" color={"text.primary"}>
                {children}
            </Typography>
            {!hideDivider && <Divider />}
        </Fragment>
    );
}

LalosTitle.propTypes = {
    children: PropTypes.any,
    hideDivider: PropTypes.any,
};
