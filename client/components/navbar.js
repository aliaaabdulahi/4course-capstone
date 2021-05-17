import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme.js";
import { connect } from "react-redux";
import Header from "./Header.js";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn }) => {
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
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
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

{
  /*
   <div>
        <Link to="/home">Home</Link>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>

*/
}
