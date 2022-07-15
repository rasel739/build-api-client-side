import { Button, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { userUpdateData } from "../../redux/feature/userDataSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "1rem",
  boxShadow: 24,
  p: 4,
};

const Model = ({ open, handleClose, updateData }) => {
  const { _id, name, phone } = updateData;

  const [inputs, setInputs] = useState({});

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateObj = {
      id: _id,
      name: inputs.name,
      phone: inputs.phone,
    };
    dispatch(userUpdateData(updateObj));
    handleClose();
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Update Data Success",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box>
                  <TextField
                    sx={{ width: "100%" }}
                    defaultValue={name}
                    name="name"
                    type="text"
                    id="name"
                    label="Name"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box>
                  <TextField
                    sx={{ width: "100%" }}
                    defaultValue={phone}
                    name="phone"
                    type="text"
                    id="phone"
                    label="phone"
                    variant="outlined"
                    onChange={handleChange}
                    required
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box>
                    <Button variant="contained" type="submit">
                      Confirm
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      type="submit"
                      onClick={handleClose}
                      color="error"
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Model;
