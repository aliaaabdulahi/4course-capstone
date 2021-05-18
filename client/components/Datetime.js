import React, {useState} from 'react';
import DateTimePicker from 'react-datetime-picker';
import {createNewEventThunk} from '../store/events';
import {connect} from 'react-redux'

function Datetime ({handleSave, history, userId}) {
  const [value, onChange] = useState (new Date ());

  const onSave = (e) => {
    console.log("saved datetime", formatDate(value));
    handleSave(e, formatDate(value), userId);
    history.push(`/startchallenge`);
  }

  const formatDate = (date) => {
    var YYYY = date.getFullYear().toString(),
        MM = (date.getMonth()+1).toString(),
        DD  = date.getDate().toString(),
        hh = date.getUTCHours().toString(),
        mm = date.getUTCMinutes().toString(),
        ss = date.getUTCSeconds().toString();
    return YYYY + "-" + (MM[1]?MM:"0"+MM[0]) + "-" + (DD[1]?DD:"0"+DD[0]) + " " + (hh[1]?hh:"0"+hh[0]) + ":" + (mm[1]?mm:"0"+mm[0]) + ":" + (ss[1]?ss:"0"+ss[0]);
};
console.log("datetime", userId)
  return (
    <div className="center">
      <h1>Choose Date & Time</h1>
      <div className="center">
        <DateTimePicker onChange={onChange} value={value} />
      </div>
      <button className="button bigCircle" onClick={onSave}>Save</button>
    </div>
  );
}

const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    userId: state.auth.id,
  };
};
const mapDispatch = dispatch => {
  return {
    handleSave(evt, date, userId) {
      evt.preventDefault()
      dispatch(createNewEventThunk(date, userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Datetime);
