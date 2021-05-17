import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

function Datetime() {
  const [value, onChange] = useState(new Date());

  return (
    <div className="center">
      <h1>Choose Date & Time</h1>
      <DateTimePicker
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default Datetime;
