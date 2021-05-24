import React, { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import { createNewEventThunk } from "../store/events";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Anime1 from "./Anime1";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  dateTimeButton: {
    ...theme.typography.button,
    fontFamily: "Permanent Marker",
    color: "#fff100",
    marginTop: "1.5em",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "ffffff",
    },
  },
  text: {
    fontSize: "2em",
    color: "#fffff",
    fontFamily: "Permanent Marker",
    backgroundColor: "#DC143C",
    borderRadius: 20,
  },
  picker: {
    color: "#fff100",
  },
  grid: {
    width: "100%",
    marginTop: "8em",
    [theme.breakpoints.down("sm")]: {
      marginTop: "3em",
    },
    [theme.breakpoints.down("xs")]: {
      marginTop: "2em",
    },
  },
  paper: {
    width: "100%",
    padding: theme.spacing(3),
    textAlign: "center",
    color: "#fff100",
    backgroundColor: theme.palette.common.hotPink,
  },
}));

function Datetime({ handleSave, history, id }) {
  const classes = useStyles();
  const [value, onChange] = useState(new Date());
  const [eventName, setEventName] = useState("");

  const onSave = (e) => {
    console.log("what is id?", id);
    console.log("saved datetime", formatDate(value));
    handleSave(e,eventName, formatDate(value), id);
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

  const handleChange = (e) => {
    setEventName(e.target.value);
  };

  return (
    <Grid container justify="center" >
      <Paper justify="center">
      <Grid item justify="center" >
      {/* <Typography>Event Name</Typography> */}
      <Grid  style={{marginTop: 5, marginLeft:20}}>
          <TextField label="Enter Event Name..." name="name" size="Normal"
                    variant="standard" onChange={handleChange} />
                    </Grid>
                    <Grid  style={{marginTop: 20, marginLeft:20}}>
          <Typography>Choose Date and Time</Typography>
          
          <DateTimePicker
            // className={classes.picker}
            onChange={onChange}
            value={value}
          />
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Button
          style={{marginTop: 20, marginLeft:20}}
          variant="contained"
          // className={classes.dateTimeButton}
          onClick={onSave}
          color="secondary"
          size="large"
        >
          Save
        </Button>
      </Grid>
      <Anime1 />
      </Paper>
    </Grid>
  );
}

const mapState = (state) => {
  return {
    id: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSave(evt, eventName, date, id) {
      evt.preventDefault();
      dispatch(createNewEventThunk(eventName, date, id));
    },
  };
};

export default connect(mapState, mapDispatch)(Datetime);
