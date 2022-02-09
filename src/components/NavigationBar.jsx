import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  CssBaseline,
  Button,
  TextField
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Authentication from "../modules/Authentication";
import { useSelector, useDispatch } from "react-redux";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state);
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({});

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value
    });
  };

  const handleEnter = async (event) => {
    if (event.keyCode === 13) {
      const response = await Authentication.signIn(loginForm);
      if (response.success) {
        dispatch({ type: "SET_CURRENT_USER", payload: response.data });
      } else {
        dispatch({
          type: "SET_ERROR_MESSAGE",
          payload: response
        });
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: "#7a1e77",
          marginBottom: "20px"
        }}
      >
        <CssBaseline />
        <Toolbar>
          <Typography
            sx={{ flexGrow: 1 }}
            variant="h4"
            component="div"
            align="center"
            data-cy="title"
            onClick={() => navigate("/")}
          >
            Recipe Hub
          </Typography>
          {showLogin ? (
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
          ) : (
            <React.Fragment>
              <Button
                color="inherit"
                data-cy="login-btn"
                onClick={() => setShowLogin(!showLogin)}
              >
                Log In
              </Button>
              <Button
                color="inherit"
                data-cy="sign-up-btn"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
