import { Fragment } from "react";
import { Typography } from "@mui/material";

export default function LalosLabelInfo({ children, label, inline }) {
    return inline ? (
        <Fragment>
            <Typography color="primary" variant="subtitle2" display="inline">
                {label}
            </Typography>
            &nbsp;
            <Typography color="GrayText" display="inline">
                {children}
            </Typography>
            <br />
        </Fragment>
    ) : (
        <Fragment>
            <Typography color="primary" variant="subtitle2">
                {label}
            </Typography>
            <Typography color="gray">{children}</Typography>
        </Fragment>
    );
}
