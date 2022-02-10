import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  CssBaseline,
  Button,
  Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginForm from "./LoginForm";

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, errorMessage, showLogin } = useSelector(
    (state) => state
  );

  const toggleLogin = () => {
    dispatch({ type: "TOGGLE_LOGIN", payload: !showLogin });
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
          {currentUser ? (
            <div>
              <div>
                <Button
                  color="inherit"
                  data-cy="my-recipes"
                  onClick={() => navigate("/my-recipes")}
                >
                  My Recipes
                </Button>
              </div>
              <div data-cy="user-name">{currentUser.name}</div>
            </div>
          ) : (
            <React.Fragment>
              {showLogin ? (
                <LoginForm />
              ) : (
                <React.Fragment>
                  <Button
                    color="inherit"
                    data-cy="login-btn"
                    onClick={toggleLogin}
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
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      {errorMessage && (
        <Alert
          data-cy="flash-message"
          severity="error"
          style={{
            marginBottom: 10,
            marginTop: -20,
            width: "auto",
            float: "right"
          }}
        >
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};

export default NavigationBar;
