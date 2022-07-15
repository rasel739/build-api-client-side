import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  signupMessage: null,
  loading: false,
  error: null,
};

export const createSignupData = createAsyncThunk(
  "signup/createSignup",
  async (signupData) => {
    const res = await axios.post(
      "http://localhost:5000/usersignup",
      signupData
    );

    return res.data;
  }
);

const createSignup = createSlice({
  name: "signup",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(createSignupData.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createSignupData.fulfilled, (state, action) => {
      state.signupMessage = true;
      state.loading = false;
    });

    builder.addCase(createSignupData.rejected, (state, action) => {
      state.loading = false;
      state.signupMessage = false;
      state.error = action.payload;
    });
  },
});

export default createSignup.reducer;
