import { Typography,Grid2 } from "@mui/material";

import LalosModal from "./LalosModal";

export default function LalosModalConfirmAction(props) {

    const { modalOpen, title, text, handleClose, handleSuccess } = props;
    return (
        <LalosModal title={title} open={modalOpen} onClose={handleClose} onSuccess={handleSuccess}>
            <Grid2 container>
                <Grid2  size={{ xs: 12}}>
                    <Typography>{text}</Typography>
                </Grid2>
            </Grid2>
        </LalosModal>
    );

}