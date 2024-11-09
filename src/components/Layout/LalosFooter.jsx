import { Typography } from "@mui/material";
import { useConfiguration } from "../../context/System/ConfigurationContext";

const LalosFooter = () => {
    const { theme } = useConfiguration();
    return (
        <div
            style={{
                height: 40,
                backgroundColor: theme.palette.secondary.main,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Typography variant="caption" color="white">
                &copy; {new Date().getFullYear()} | Pizzeria Lalos
            </Typography>
        </div>
    );
};

export default LalosFooter;
