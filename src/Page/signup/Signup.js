import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as MuiLink } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createSignupData } from "../../redux/feature/signupSlice";

const theme = createTheme();

const Signup = () => {
  const { signupMessage } = useSelector(
    (state) => state.rootReducer.signupReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (signupMessage) {
    Swal.fire({
      icon: "success",
      title: "Your create account successfully completed",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const signupData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(createSignupData(signupData));

    if (!signupMessage) {
      Swal.fire({
        icon: "error",
        title: "Your  account already exists",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/signup");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <MuiLink href="/login" variant="body2">
                  Already have an account? Sign in
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Signup;
