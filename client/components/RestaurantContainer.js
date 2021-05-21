import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  resListButton: {
    ...theme.typography.button,
    fontFamily: "Permanent Marker",
    color: "#fff100",
  },
  listItem: {
    listStyleType: "none",
    backgroundColor: "#dc143c",
    fontSize: "15px",
  },
  inviteButton: {
    fontFamily: "Permanent Marker",
    color: "#ff99bb",
  },
}));

const RestaurantContainer = (props) => {
  const restaurantToBackEnd = () => {
    const restaurantArray = props.resSelections.map(
      (selection) => selection.yelpId
    );
  };

  const classes = useStyles();
  return (
    <div id="main-selection-container">
      <div>
        {props.resSelections.map((res) => (
          <Grid item key={res.yelpId}>
            <Paper elevation={5} className={classes.listItem}>
              <p className="yellow-font">{res.yelpName}</p>
            </Paper>
            <Button
              className={classes.resListButton}
              variant="contained"
              color="secondary"
              onClick={() => props.removal(res.yelpId)}
            >
              remove
            </Button>
          </Grid>
        ))}
      </div>
      <Button
        className={classes.inviteButton}
        variant="contained"
        color="secondary"
        size="large"
        onClick={() => props.addSelectionsToStore()}
      >
        INVITE FRIENDS
      </Button>
    </div>
  );
};

export default RestaurantContainer;
