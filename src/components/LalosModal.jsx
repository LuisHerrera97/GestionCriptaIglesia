import { Button, Dialog, DialogActions, IconButton, Typography } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { Fragment } from "react";
import { useConfiguration } from "../context/System/ConfigurationContext";

export default function LalosModal({
    id,
    open,
    maxWidth,
    title,
    success,
    success2,
    hideSuccess,
    hideCancel,
    disableSuccess,
    cancel,
    form,
    onSuccess,
    onSuccess2,
    onCancel,
    onClose,
    children,
    color
}) {
    const { theme } = useConfiguration();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onSuccess) {
            await onSuccess();
        }
    };

    const handleClose = (e, reason) => {
        if (reason === "backdropClick") {
            return;
        }
        onClose();
    };

    return (
        <Dialog
            id={id}
            className="cripta-modal"
            open={open}
            onClose={handleClose}
            maxWidth={!maxWidth ? "sm" : maxWidth}
            fullWidth
            scroll="body"
            PaperProps={{
                variant: "elevation",
                style: {
                    overflowY: "initial",
                },
            }}
            BackdropProps={{
                style: {
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                },
            }}
        >
            <div
                className="title-container"
                style={{ backgroundColor: color ? color : theme.palette.secondary.main, borderRadius: "4px 4px 0px 0px" }}
            >
                <div className="text-content">
                    <Typography variant="h6" color="white">
                        {title}
                    </Typography>
                </div>
                {true && (
                    <IconButton className="btn-close" onClick={onClose} size="small">
                        <CloseIcon />
                    </IconButton>
                )}
            </div>
            {form ? (
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <div className="content">{children}</div>
                    <DialogActions>
                        {!hideCancel && (
                            <Button color="inherit" onClick={!onCancel ? onClose : onCancel}>
                                {!cancel ? "Cancelar" : cancel}
                            </Button>
                        )}
                        {!hideSuccess && <Button type="submit">{!success ? "Confirmar" : success}</Button>}
                    </DialogActions>
                </form>
            ) : (
                <Fragment>
                    <div className="content">{children}</div>
                    <DialogActions>
                        {!hideCancel && (
                            <Button color="inherit" onClick={!onCancel ? onClose : onCancel}>
                                {!cancel ? "Cancelar" : cancel}
                            </Button>
                        )}
                        {!hideSuccess && (
                            <Fragment>
                                <Button onClick={!onSuccess ? () => { } : onSuccess} disabled={disableSuccess}>
                                    {!success ? "Confirmar" : success}
                                </Button>
                                {success2 && (
                                    <Button onClick={!onSuccess2 ? () => { } : onSuccess2} disabled={disableSuccess}>
                                        {!success ? "Confirmar" : success2}
                                    </Button>
                                )}

                            </Fragment>
                        )}
                    </DialogActions>
                </Fragment>
            )}
        </Dialog>
    );
}
