import React, {useState} from 'react';
import DateTimePicker from 'react-datetime-picker';
import {createNewEventThunk} from '../store/events';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Anime1 from './Anime1';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';

const useStyles = makeStyles (theme => ({
  dateTimeButton: {
    ...theme.typography.button,
    fontFamily: 'Permanent Marker',
    color: '#fff100',
    marginTop: '5.5em',
    '&:hover': {
      color: '#DC143C',
      backgroundColor: 'fff100',
    },
  },
  text: {
    color: '#fff100',
    fontFamily: 'Permanent Marker',
    backgroundColor: '#DC143C',
    borderRadius: 10,
  },
  picker: {
    color: '#fff100',
  },
  grid: {
    width: '100%',
    marginTop: '8em',
    [theme.breakpoints.down ('sm')]: {
      marginTop: '3em',
    },
    [theme.breakpoints.down ('xs')]: {
      marginTop: '2em',
    },
  },
  paper: {
    padding: theme.spacing (3),
    textAlign: 'center',
    color: '#fff100',
    backgroundColor: theme.palette.common.hotPink,
  },
}));

function Datetime({handleSave, history, id}) {
  const classes = useStyles ();
  const [value, onChange] = useState (new Date ());
  const [eventName, setEventName] = useState ('');

  const onSave = e => {
    console.log ('saved datetime', formatDate (value));
    handleSave (e, eventName, formatDate (value), id);
    history.push (`/startchallenge`);
  };

  const formatDate = date => {
    var YYYY = date.getFullYear ().toString (),
      MM = (date.getMonth () + 1).toString (),
      DD = date.getDate ().toString (),
      hh = date.getUTCHours ().toString (),
      mm = date.getUTCMinutes ().toString (),
      ss = date.getUTCSeconds ().toString ();
    return (
      YYYY +
      '-' +
      (MM[1] ? MM : '0' + MM[0]) +
      '-' +
      (DD[1] ? DD : '0' + DD[0]) +
      ' ' +
      (hh[1] ? hh : '0' + hh[0]) +
      ':' +
      (mm[1] ? mm : '0' + mm[0]) +
      ':' +
      (ss[1] ? ss : '0' + ss[0])
    );
  };

  const handleChange = (e) => {
    setEventName(e.target.value);
  }

  return (
    <Grid container spacing={10} className={classes.grid}>
      <Grid item xs={4}>
        <Anime1 />
      </Grid>
      <Grid item xs={4}>
        <Paper className={classes.paper}>
          <h1 className={classes.text}>Choose Event Name</h1>
          <input type="text" name="name" onChange={handleChange} />
        </Paper>
        <Paper className={classes.paper}>
          <h1 className={classes.text}>Choose Date & Time</h1>
          <DateTimePicker
            className={classes.picker}
            onChange={onChange}
            value={value}
          />
        </Paper>
      </Grid>
      <Grid item xs={4}>
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
  );
}

const mapState = state => {
  return {
    id: state.auth.id,
  };
};

const mapDispatch = dispatch => {
  return {
    handleSave (evt, eventName, date, id) {
      evt.preventDefault ();
      dispatch (createNewEventThunk (eventName, date, id));
    },
  };
};

export default connect (mapState, mapDispatch) (Datetime);
