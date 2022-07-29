import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { googleLogin } from "../../redux/feature/loginSlice";

const GoogleLogin = () => {
  const { token, email } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(googleLogin(email));
    localStorage.setItem("token", `Bearer ${token}`);
    navigate("/");
  }, [dispatch, email, token, navigate]);

  return <div></div>;
};

export default GoogleLogin;
