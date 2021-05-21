import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme.js";
import { connect } from "react-redux";
import Header from "./Header.js";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import { logout } from "../store";
import logo from "../../public/Crimson-4Course-Logo.png";

const useStyles = makeStyles((theme) => ({
  welcomeBar: {
    backgroundColor: "#dc143c",
    height: "350px",
    width: "375px",
    marginTop: "80px",
  },
  welcomeBarText: {
    fontFamily: "Permanent Marker",
    textAlign: "center",
    color: "#fff100",
    fontSize: "36px",
  },
  welcomeLogo: {
    height: "175px",
    width: "320px",
    padding: "10px",
    marginTop: "16px",
  },
  logText: {
    color: "#ff99bb",
  },
}));

const Navbar = ({ handleClick, isLoggedIn }) => {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  return (
    <div>
      {isLoggedIn ? (
        <ThemeProvider theme={theme}>
          <Header
            value={value}
            setValue={setValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <Grid container direction="column" justify="center">
            <Grid item>
              <Paper className={classes.welcomeBar} elevation={15}>
                <Typography className={classes.welcomeBarText}>
                  Please <span className={classes.logText}>Log-in</span> or{" "}
                  <span className={classes.logText}>Sign-up</span> to Play!
                </Typography>
                <img
                  src={logo}
                  alt="4course-logo"
                  className={classes.welcomeLogo}
                />
              </Paper>
            </Grid>
            <Grid item>
              <div id="login-signup-bar">
                <Button
                  component={Link}
                  to="/login"
                  className={classes.welcomeButton}
                  variant="contained"
                  color="secondary"
                >
                  Login
                </Button>
                <Button
                  component={Link}
                  to="/signup"
                  className={classes.welcomeButton}
                  variant="contained"
                  color="secondary"
                >
                  Signup
                </Button>
              </div>
            </Grid>
          </Grid>
        </ThemeProvider>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
