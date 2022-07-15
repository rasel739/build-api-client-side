import Box from "@mui/material/Box";

import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import resetPasswordStyle from "../../assets/style/resetPassword.module.scss";
import { resetPasswordConfirm } from "../../redux/feature/resetPasswordSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});

  const { userId, token } = useParams();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.newPassword === inputs.confirmPassword) {
      const resetPasswordConfirms = {
        userId: userId,
        token: token,
        confirmPassword: inputs.confirmPassword,
      };
      dispatch(resetPasswordConfirm(resetPasswordConfirms));
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "password reset completed successfull please login",
        showConfirmButton: false,
        timer: 3000,
      });
      navigate("/login");
    } else {
      console.log("password is not equal");
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pt: 10 }}>
      <Container>
        <Box>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{ flexGrow: 1 }}
              className={resetPasswordStyle.reset__password}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="new-password"
                    name="newPassword"
                    label="New Password"
                    variant="outlined"
                    type="password"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" type="submit" color="error">
                    Reset Password
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </Container>
  );
};

export default ResetPassword;
