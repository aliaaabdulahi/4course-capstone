import React, {useState} from 'react';
import DateTimePicker from 'react-datetime-picker';
import {createNewEventThunk} from '../store/events';
import {connect} from 'react-redux';

function Datetime({handleSave, history}) {
  const [value, onChange] = useState (new Date ());

  const onSave = e => {
    console.log ('saved datetime', formatDate (value));
    handleSave (e, formatDate (value));
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

  return (
    <div className="center shape">
        <h1>Choose Date & Time</h1>
        <div className="center">
          <DateTimePicker onChange={onChange} value={value} />
        </div>
        <button className="button normal" onClick={onSave}>Save</button>
    </div>
  );
}

const mapDispatch = dispatch => {
  return {
    handleSave (evt, date) {
      evt.preventDefault ();
      dispatch (createNewEventThunk (date));
    },
  };
};

export default connect (null, mapDispatch) (Datetime);
