import React from "react";
import { connect } from "react-redux";
import Datetime from "./Datetime";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  headers: {
    fontFamily: "Permanent Marker",
    color: "#DC143C",
    marginTop: 25,
  },
  upcomingTitle: {
    fontFamily: "Permanent Marker",
    color: "#DC143C",
  },
  pastTitle: {
    fontFamily: "Permanent Marker",
    color: "#DC143C",
  },
  newChallengeButton: {
    ...theme.typography.button,
    fontFamily: "Permanent Marker",
    color: "#fff100",
    marginTop: "1em",
    "&:hover": {
      color: "#DC143C",
      backgroundColor: "fff100",
    },
    fontSize: 30,
    borderRadius: 20,
  },
}));

export const Home = (props) => {
  const classes = useStyles();
  console.log("what are my props at home ", props);
  const { username } = props;

  const upcomingEvents = [
    {
      name: "Event1",
      datetime: "2021-06-01:12:00:00PM",
      assignedRestaurant: "Five Guys",
      assignedCourse: "Main",
    },
    {
      name: "Event2",
      datetime: "2021-06-02:12:00:00PM",
      assignedRestaurant: "Amanda's",
      assignedCourse: "Desserts",
    },
    {
      name: "Event3",
      datetime: "2021-06-15:12:00:00PM",
      assignedRestaurant: "Pizza Hut",
      assignedCourse: "Appetizers",
    },
  ];

  return (
    <div>
      <Typography className={classes.headers} variant="h4">
        Welcome, {username}
      </Typography>

      <div className="shape">

      <div className="center">
        <form onSubmit={() => props.history.push(`/datetime`)}>
          <Button
            className={classes.newChallengeButton}
            type="submit"
            size="medium"
            color="secondary"
            variant="contained"
          >
            Start New Challenge
          </Button>
        </form>
        <div className="row">
          <div className="column">
            <Typography variant="h5" className={classes.upcomingTitle}>
              <Link to='/upcomingevents'>Upcoming Events</Link>
            </Typography>
            {/* those need to move to the new componet
            <div>
              {upcomingEvents.map((event) => (
                <Link to="/event:id">
                  <p key={event.name}>{event.name}</p>
                </Link>
              ))}
            </div> */}
          </div>
          <div className="column">
            <Typography variant="h5" className={classes.pastTitle}>
            <Link to='/pastevents'>Past Events</Link>
            </Typography>
            {/* those need to move to the new componet
            <div>
              {upcomingEvents.map((event) => (
                <Link to="/event:id">
                  <p key={event.name}>{event.name}</p>
                </Link>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
