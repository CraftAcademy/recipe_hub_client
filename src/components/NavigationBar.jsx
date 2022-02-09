import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  CssBaseline,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "./LoginForm";

const NavigationBar = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state);
  const [showLogin, setShowLogin] = useState(false);

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
            <div data-cy="user-name">{currentUser.name}</div>
          ) : (
            <React.Fragment>
              {showLogin ? (
                <LoginForm />
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
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
