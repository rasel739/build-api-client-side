import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loginData: null,
  auth: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "login/userLogin",
  async (loginData) => {
    const res = await axios.post(`http://localhost:5000/loginUser`, loginData);

    return res.data;
  }
);

const loginUserSlice = createSlice({
  name: "login",
  initialState,

  reducers: {
    logOut: (state, action) => {
      state.auth = action.payload;
      state.loginData = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser, (state) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loginData = action.payload;
      state.auth = true;
      state.loading = false;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.auth = false;
      state.error = action.error.message;
    });
  },
});

export const { logOut } = loginUserSlice.actions;
export default loginUserSlice.reducer;
