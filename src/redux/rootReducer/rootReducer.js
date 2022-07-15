import { combineReducers } from "@reduxjs/toolkit";
import loginReducer from "../feature/loginSlice";
import resetPasswordReducer from "../feature/resetPasswordSlice";
import signupReducer from "../feature/signupSlice";
import userReducer from "../feature/userDataSlice";

const rootReducer = combineReducers({
  userReducer,
  signupReducer,
  loginReducer,
  resetPasswordReducer,
});

export default rootReducer;
