import React, {useEffect} from 'react';
import {connect} from 'react-redux';

/**
 * COMPONENT
 */
export const Home = props => {
  const {username} = props;

  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  function success (pos) {
    var crd = pos.coords;

    console.log ('Your current position is:');
    console.log (`Latitude : ${crd.latitude}`);
    console.log (`Longitude: ${crd.longitude}`);
    console.log (`More or less ${crd.accuracy} meters.`);
  }

  function error (err) {
    console.warn (`ERROR(${err.code}): ${err.message}`);
  }

  useEffect (() => {
    console.log ('inside useEffect');
    navigator.geolocation.getCurrentPosition (success, error, options);
  });

  return (
    <div>
      <h3>Welcomeeee, {username}</h3>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.auth.username,
  };
};

export default connect (mapState) (Home);
