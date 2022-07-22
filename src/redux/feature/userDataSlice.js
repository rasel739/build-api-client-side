import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  userData: [],
  loading: false,
  dataAdd: "",
  error: null,
};

export const userCreateData = createAsyncThunk(
  "userData/userPostData",
  async (userData) => {
    const res = await axios.post("http://localhost:5000/api/user", userData, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    return res.data;
  }
);

export const userGetData = createAsyncThunk(
  "userData/userGetData",
  async (email) => {
    const res = await axios.get(`http://localhost:5000/api/user/${email}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    return res.data;
  }
);

export const userUpdateData = createAsyncThunk(
  "user/userUpdateData",
  async (updateObj) => {
    const { id, name, phone } = updateObj;
    const res = await axios.patch(
      `http://localhost:5000/api/user/${id}`,
      {
        name: name,
        phone: phone,
      },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    return res.data;
  }
);

export const userDeleteData = createAsyncThunk(
  "user/userDeleteData",
  async (_id) => {
    const res = await axios.delete(`http://localhost:5000/api/user/${_id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    return res.data;
  }
);

const createUserData = createSlice({
  name: "userData",
  initialState: initialState,
  extraReducers: (builder) => {
    //userData add

    builder.addCase(userCreateData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userCreateData.fulfilled, (state, action) => {
      state.loading = false;
      state.userData.push(action.payload);
      state.dataAdd = true;
      state.error = null;
    });

    builder.addCase(userCreateData.rejected, (state, action) => {
      state.loading = false;
      state.dataAdd = false;
      state.error = action.error.message;
    });

    //userGetData

    builder.addCase(userGetData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(userGetData.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
    });

    builder.addCase(userGetData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //userUpdateData
    builder.addCase(userUpdateData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(userUpdateData.fulfilled, (state, action) => {
      const { _id, name, phone } = action.payload;
      state.userData.map((user) => {
        if (user._id === _id) {
          user.name = name;
          user.phone = phone;
        }
        return user;
      });
      state.loading = false;
      state.error = null;
    });

    builder.addCase(userUpdateData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //userDeleteData

    builder.addCase(userDeleteData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(userDeleteData.fulfilled, (state, action) => {
      const result = state.userData.filter(
        (user) => user._id !== action.payload
      );
      state.loading = false;
      state.error = null;
      state.userData = result;
    });

    builder.addCase(userDeleteData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default createUserData.reducer;
