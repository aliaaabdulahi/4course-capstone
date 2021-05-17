import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Login, Signup } from "./components/AuthForm";
import Emails from "./components/Emails";
import Invite from "./components/Invite";
import Home from "./components/home";
import Map from "./components/Map";
import BeginSearch from "./components/BeginSearch";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme.js";
import {
  withRouter,
  Redirect,
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom";
import Datetime from "./components/Datetime";
import { me } from "./store";
import Wheel from "./components/Wheel";

class Routes extends React.Component {
  componentDidMount() {
    this.props.loadInitialData();
  }
  render() {
    const { isLoggedIn } = this.props;
    return (
      <ThemeProvider theme={theme}>
        {isLoggedIn ? (
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/yelp" component={Map} />
            <Route path="/emails" component={Emails} />
            <Route path="/invite" component={Invite} />
            <Route exact path="/startchallenge" component={BeginSearch} />
            <Route
              exact
              path="/pastevents"
              component={() => <div>Past Events</div>}
            />
            <Route
              exact
              path="/upcomingevents"
              component={() => <div>Upcoming Events</div>}
            />
            <Route path="/datetime" component={Datetime} />
            <Route path="/Wheel" component={Wheel} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )}
      </ThemeProvider>
    );
  }
}
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/*
function Routes(props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  useEffect = () => {
    props.loadInitialData();
  };
  const { isLoggedIn } = props;

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        {isLoggedIn ? (
          <Switch>
            <Route
              exact
              path="/"
              component={() => <div style={{ height: "2000px" }}>Home</div>}
            />
            <Route
              exact
              path="/startchallenge"
              component={() => <div>Start Challenge</div>}
            />
            <Route
              exact
              path="/pastevents"
              component={() => <div>Past Events</div>}
            />
            <Route
              exact
              path="/upcomingevents"
              component={() => <div>Upcoming Events</div>}
            />
            <Route path="/yelp" component={Map} />
            <Route path="/emails" component={Emails} />
            <Route path="/invite" component={Invite} />
            <Route path="/beginsearch" component={BeginSearch} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/login" component={() => <div>Login</div>} />
            <Route exact path="/signup" component={() => <div>Signup</div>} />
          </Switch>
        )}
        {/*
        <Footer
          value={value}
          setValue={setValue}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
       }
      </BrowserRouter>
    </ThemeProvider>
  );
}
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
*/
