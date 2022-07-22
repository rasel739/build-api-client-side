import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Container } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Model from "../../components/model/Model";
import PreLoader from "../../PreLoder/PreLoader";

import { userDeleteData, userGetData } from "../../redux/feature/userDataSlice";

const ShowDataTable = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState("");

  const { loginData } = useSelector((state) => state.persistedReducer);
  const { userData, loading } = useSelector(
    (state) => state.rootReducer.userReducer
  );

  const handleClose = () => setOpen(false);
  const handleOpen = (data) => {
    setUpdateData(data);
    setOpen(true);
  };

  useEffect(() => {
    dispatch(userGetData(loginData?.user));
  }, [loginData, dispatch]);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(userDeleteData(_id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <Container maxWidth=" xl" sx={{ pt: 10 }}>
      <Container>
        {loading ? (
          <PreLoader />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>User Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userData?.length === 0 ? (
                  <TableRow>
                    {[
                      "Id",
                      "User image",
                      "name",
                      "phone",
                      "update",
                      "delete",
                    ].map((items) => (
                      <TableCell>{items} is empty</TableCell>
                    ))}
                  </TableRow>
                ) : (
                  userData.map((data, index) => (
                    <TableRow
                      key={data._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <Avatar alt={data.name} src={data?.image} />
                      </TableCell>
                      <TableCell>{data.name}</TableCell>

                      <TableCell>{data.phone}</TableCell>
                      <TableCell>
                        {" "}
                        <Button
                          variant="outlined"
                          startIcon={<EditIcon />}
                          color="success"
                          onClick={() => handleOpen(data)}
                        >
                          Update
                        </Button>
                      </TableCell>
                      <TableCell>
                        {" "}
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          color="error"
                          onClick={() => handleDelete(data._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Container>
      <Model open={open} handleClose={handleClose} updateData={updateData} />
    </Container>
  );
};

export default ShowDataTable;
