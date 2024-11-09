import { ListItem, ListItemButton, ListItemText } from "@mui/material";

import { Link } from "react-router-dom";
import { useConfiguration } from "../../context/System/ConfigurationContext";
import { useLayout } from "../../context/System/LayoutContext";

export default function LalosMenuItem({ children, icon, route, clavePagina }) {
    const { handleCloseMenuClient, clavePaginaActual } = useLayout();
    const { theme } = useConfiguration();

    const paginaActual = clavePaginaActual === clavePagina;

    return (
        <Link to={route} style={{ textDecoration: "none", color: "initial" }}>
            <ListItem
                disablePadding
                onClick={handleCloseMenuClient}
                style={{ backgroundColor: paginaActual ? theme.palette.primary.dark : "initial" }}
            >
                <ListItemButton sx={{ paddingLeft: "50px", paddingTop: "2px", paddingBottom: "2px" }}>
                    <ListItemText
                        primary={children}
                        primaryTypographyProps={{
                            style: { fontSize: "0.9rem", color: "white" },
                        }}
                    />
                </ListItemButton>
            </ListItem>
        </Link>
    );
}
