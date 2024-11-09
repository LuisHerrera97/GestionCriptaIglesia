import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const LalosInputWhite = styled(TextField)({
    "& label.Mui-focused": {
        color: "#fff",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#fff",
    },
    "& .MuiInputBase-input": {
        color: "#fff",
        borderColor: "#fff",
    },
    "& .MuiFormLabel-root": {
        color: "#fff",
    },
    "& .MuiSvgIcon-root": {
        color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "#fff",
        },
        "&:hover fieldset": {
            borderColor: "#fff",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#fff",
        },
    },
});

export default LalosInputWhite;
