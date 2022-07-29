import MenuIcon from "@mui/icons-material/Menu";
import { Button, Container, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import navStyle from "../../assets/style/navbar.module.scss";
import { logOut } from "../../redux/feature/loginSlice";

const Navbar = () => {
  const { auth, loginData } = useSelector((state) => state.persistedReducer);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="xl" className={navStyle.navbar}>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar
            position="static"
            className={navStyle.navbar__appBar}
            sx={{ boxShadow: 0 }}
          >
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Build Api
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {loginData ? loginData?.user || loginData : " "}
              </Typography>
              {auth ? (
                <Button
                  variant="contained"
                  type="submit"
                  color="error"
                  onClick={() => dispatch(logOut(null))}
                >
                  LogOut
                </Button>
              ) : (
                <div>
                  <button className={navStyle.navbar__btn}>
                    <Link
                      href="/login"
                      className={navStyle.navbar__login}
                      underline="none"
                    >
                      Login
                    </Link>
                  </button>
                  <button className={navStyle.navbar__btn}>
                    <Link
                      href="/signup"
                      className={navStyle.navbar__signup}
                      underline="none"
                    >
                      SignUp
                    </Link>
                  </button>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </Box>
      </Container>
    </Container>
  );
};

export default Navbar;
