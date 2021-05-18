import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { createNewEventThunk } from "../store/events";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  dateTimeButton: {
    ...theme.typography.button,
    fontFamily: "Permanent Marker",
    color: "#fff100",
    marginTop: "1em",
    "&:hover": {
      color: "#DC143C",
      backgroundColor: "fff100",
    },
  },
  text: {
    color: "#fff100",
    fontFamily: "Permanent Marker",
    backgroundColor: "#DC143C",
    borderRadius: 10,
  },
  picker: {
    color: "#fff100",
  },
  container: {
    backgroundColor: "#fff100",
  },
}));

function Datetime({ handleSave, history }) {
  const classes = useStyles();
  const [value, onChange] = useState(new Date());

  const onSave = (e) => {
    console.log("saved datetime", formatDate(value));
    handleSave(e, formatDate(value));
    history.push(`/startchallenge`);
  };

  const formatDate = (date) => {
    var YYYY = date.getFullYear().toString(),
      MM = (date.getMonth() + 1).toString(),
      DD = date.getDate().toString(),
      hh = date.getUTCHours().toString(),
      mm = date.getUTCMinutes().toString(),
      ss = date.getUTCSeconds().toString();
    return (
      YYYY +
      "-" +
      (MM[1] ? MM : "0" + MM[0]) +
      "-" +
      (DD[1] ? DD : "0" + DD[0]) +
      " " +
      (hh[1] ? hh : "0" + hh[0]) +
      ":" +
      (mm[1] ? mm : "0" + mm[0]) +
      ":" +
      (ss[1] ? ss : "0" + ss[0])
    );
  };

  return (
    <Grid container direction="column" className={classes.container}>
      <Grid container justify="center" alignItems="stretch" direction="row">
        <Grid item>
          <h1 className={classes.text}>Choose Date & Time</h1>
          <div className="center">
            <DateTimePicker
              className={classes.picker}
              onChange={onChange}
              value={value}
            />
          </div>
          <Grid container item direction="row" justify="center">
            <Grid item>
              <Button
                variant="contained"
                className={classes.dateTimeButton}
                onClick={onSave}
                color="secondary"
                size="large"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapDispatch = (dispatch) => {
  return {
    handleSave(evt, date) {
      evt.preventDefault();
      dispatch(createNewEventThunk(date));
    },
  };
};

export default connect(null, mapDispatch)(Datetime);
