import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "../../redux/feature/loginSlice";
import { resetPassword } from "../../redux/feature/resetPasswordSlice";

const theme = createTheme();

const Login = () => {
  const { auth } = useSelector((state) => state.persistedReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (auth === true) {
    Swal.fire({
      icon: "success",
      title: "Your  account login success",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginObj = {
      email: data.get("email"),
      password: data.get("password"),
    };

    dispatch(loginUser(loginObj));
    if (auth === false) {
      Swal.fire({
        icon: "error",
        title: "Authentication failed!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/login");
    }
  };

  const handleResetEmail = async () => {
    const { value: email } = await Swal.fire({
      inputLabel: " Your signup email address",
      input: "email",
      inputPlaceholder: "Enter your email address",
      confirmButtonText: "Confirm",
    });
    if (email) {
      dispatch(resetPassword({ email: email }));
      Swal.fire({
        icon: "success",
        title:
          "password reset link sent to your email account please check inbox and spam box",
        showConfirmButton: false,
        timer: 3000,
      });
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  onClick={handleResetEmail}
                  sx={{ cursor: "pointer" }}
                >
                  Reset password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
