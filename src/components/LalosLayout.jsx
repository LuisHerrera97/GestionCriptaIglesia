import { AppBar, Drawer, IconButton, Toolbar, Tooltip, Typography, useMediaQuery, useTheme,ModalProps,Backdrop  } from "@mui/material";
import { Fragment, useState } from "react";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import LalosBody from "./LalosBody";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useLayout } from "../context/System/LayoutContext";

export default function LalosLayout({ children, titlePage, buttonActions, buttonsPosition, detailComponent }) {
    const [detailOpen, setDetailOpen] = useState(false);
    const { detailDashboardOpen, handleOpenDetailDashboard, handleCloseDetailDashboard } = useLayout();

    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

    const handleOpenDetail = () => {
        setDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setDetailOpen(false);
    };

    return (
        <Fragment>
            <div className="cripta-elementos">
                <div className="work">
                    <LalosBody>
                        <AppBar
                            className="title"
                            position="static"
                            color="secondary"
                            style={{ zIndex: 100, overflowX: "auto" }}
                        >
                            <Toolbar variant="dense" style={{ gap: 4 }}>
                                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                                    {titlePage}
                                </Typography>
                                {buttonActions && (
                                    <Fragment>
                                        {buttonActions}
                                        {isMdDown && detailComponent && (
                                            <Tooltip title="Ver detalles">
                                                <IconButton onClick={handleOpenDetail}>
                                                    <ReadMoreIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                        {isMdUp && detailComponent && !detailDashboardOpen && (
                                            <Tooltip title="Mostrar panel de detalle">
                                                <IconButton onClick={handleOpenDetailDashboard}>
                                                    <ReadMoreIcon />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Fragment>
                                )}
                            </Toolbar>
                        </AppBar>
                        <div className="elements">
                            <LalosBody>{children}</LalosBody>
                        </div>
                    </LalosBody>
                </div>
                {isMdUp && detailComponent && detailDashboardOpen && (
                    <div className="detail" style={{ display: "flex", flexDirection: "column" }}>
                        <AppBar color="primary" position="static" variant="elevation">
                            <Toolbar variant="dense" style={{ gap: 4 }}>
                                <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                                    Detalles
                                </Typography>
                                <Tooltip title="Ocultar panel de detalle" placement="left">
                                    <IconButton color="primary" onClick={handleCloseDetailDashboard}>
                                        <ChevronRightIcon />
                                    </IconButton>
                                </Tooltip>
                            </Toolbar>
                        </AppBar>
                        <LalosBody padding={10}>{detailComponent}</LalosBody>
                    </div>
                )}
            </div>
            {isMdDown && detailComponent && (
                <Drawer
                    open={detailOpen}
                    anchor="right"
                    onClose={handleCloseDetail}
                    ModalProps={{
                        BackdropComponent: Backdrop,
                        BackdropProps: {
                            sx: { backgroundColor: "transparent" }, // Aquí puedes ajustar el color de fondo o cualquier otra propiedad
                        },
                    }}
                    PaperProps={{
                        sx: { boxShadow: "-15px 0px 50px rgba(44, 47, 61, 0.15);" },
                    }}
                >
                    <AppBar color="primary" position="static">
                        <Toolbar variant="dense">
                            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                                Detalles
                            </Typography>
                            <Tooltip title="Cerrar panel de detalle" placement="left">
                                <IconButton color="inherit" onClick={handleCloseDetail}>
                                    <CloseIcon />
                                </IconButton>
                            </Tooltip>
                        </Toolbar>
                    </AppBar>
                    <div style={{ width: 250, padding: 10 }}>{detailComponent}</div>
                </Drawer>
            )}
        </Fragment>
    );
}
