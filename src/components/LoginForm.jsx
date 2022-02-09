import React, { useState } from "react";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import Authentication from "../modules/Authentication";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({});

  const handleEnter = async (event) => {
    if (event.keyCode === 13) {
      const response = await Authentication.signIn(loginForm);
      if (response.success) {
        console.log(response.data);
        dispatch({ type: "SET_CURRENT_USER", payload: response.data });
      } else {
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: response
        });
      }
    }
  };

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value
    });
  };

  return (
    <React.Fragment>
      <TextField
        data-cy="email-input"
        label="Email"
        name="email"
        size="small"
        onChange={handleChange}
        onKeyDown={handleEnter}
        variant="outlined"
        style={{ backgroundColor: "white", borderRadius: "5px" }}
      />
      <TextField
        data-cy="password-input"
        label="Password"
        name="password"
        type="password"
        size="small"
        onChange={handleChange}
        onKeyDown={handleEnter}
        variant="outlined"
        style={{ backgroundColor: "white", borderRadius: "5px" }}
      />
    </React.Fragment>
  );
};

export default LoginForm;
