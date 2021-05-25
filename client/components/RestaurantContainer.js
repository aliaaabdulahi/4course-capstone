import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  resListButton: {
    ...theme.typography.button,
    fontFamily: "Permanent Marker",
    color: "#fff100",
  },
  listItem: {
    listStyleType: "none",
    backgroundColor: "#fff100",
    fontSize: "15px",
    textAlign: "center",
    margin: "10px",
  },
  inviteButton: {
    fontFamily: "Permanent Marker",
    color: "#fff100",
    alignSelf: "center",
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
      <div id="res-selections">
        {props.resSelections.map((res) => (
          <div key={res.yelpId}>
            <Paper elevation={5} className={classes.listItem}>
              <p className="red">{res.yelpName}</p>
            </Paper>
            <Button
              className={classes.resListButton}
              variant="contained"
              color="secondary"
              onClick={() => props.removal(res.yelpId)}
            >
              remove
            </Button>
          </div>
        ))}
      </div>
      <div id="invite-button">
        <Button
          className={classes.inviteButton}
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => props.addSelectionsToStore()}
        >
          INVITE FRIENDS <SendIcon color="#ff99bb" fontSize="small" />
        </Button>
      </div>
    </div>
  );
};

export default RestaurantContainer;
