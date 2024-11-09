import { Button, InputLabel, Paper, TextField, Typography,Grid2} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BackImage from "../../img/LogoCripta.jpg";
import KeyIcon from "@mui/icons-material/Key";
import LogoMain from "../../img/catedral.jpg";
import PersonIcon from "@mui/icons-material/Person";
import { useConfiguration } from "../../context/System/ConfigurationContext";
import { useSession } from "../../context/System/SessionContext";

export default function LalosLogin() {
  const {
    loginForm: { username, password },
    handleChangeLoginForm,
    handleSubmitLoginForm
  } = useSession();
  const { theme } = useConfiguration();

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${BackImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="op" style={{ backgroundColor: theme.palette.secondary.main + "BB" }}>
        <Grid2 container >
          <Grid2 size={{ xs: 12, md: 12 }} display="flex" justifyContent="center">
            <Paper sx={{ padding: 6, borderRadius: 10 }} className="login-content">
              <form noValidate onSubmit={handleSubmitLoginForm}>
                <Grid2 container>
                  <Grid2 size={{ xs: 12}} align="center">
                    <img src={LogoMain} alt="logo_main" style={{ maxWidth: 150 }} />
                  </Grid2>
                  <Grid2 size={{ xs: 12}}></Grid2>
                  <Grid2 size={{ xs: 12}}>
                    <Typography variant="h6" color="#00a8e4" align="center">
                      ACCESO AL SISTEMA
                    </Typography>
                  </Grid2>
                  <Grid2 size={{ xs: 12}}></Grid2>
                  <Grid2 size={{ xs: 12}}>
                    <InputLabel className="lbl" required>
                      <PersonIcon className="in" />
                      Usuario
                    </InputLabel>
                    <TextField
                      name="username"
                      value={username.value}
                      onChange={handleChangeLoginForm}
                      error={username.error}
                      helperText={username.error && "Nombre de usuario requerido"}
                      autoComplete="new-password"
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12}} marginBottom={2}>
                    <InputLabel className="lbl" required>
                      <KeyIcon className="in" />
                      Contraseña
                    </InputLabel>
                    <TextField
                      name="password"
                      value={password.value}
                      onChange={handleChangeLoginForm}
                      error={password.error}
                      helperText={password.error && "Contraseña requerida"}
                      type="password"
                      autoComplete="new-password"
                    />
                  </Grid2>
                  <Grid2 size={{ xs: 12}} textAlign="center">
                    <Button type="submit" endIcon={<ArrowForwardIcon />}>
                      Ingresar
                    </Button>
                  </Grid2>
                  <Grid2 size={{ xs: 12}} className="center">
                    <Typography variant="caption">&copy; {new Date().getFullYear()} - Gestion Criptas</Typography>
                  </Grid2>
                </Grid2>
              </form>
            </Paper>
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
}
