import React, { useEffect } from "react";
import { connect } from "react-redux";
import { apiKey } from "../../secret.js";

/**
 * COMPONENT
 */
export const Home = (props) => {
  const { username } = props;

  let myCoords = [];

  const options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;

    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    myCoords.push(crd.latitude);
    myCoords.push(crd.longitude);

    getBusinesses(myCoords[0], myCoords[1]);
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  async function getBusinesses(lat, long) {
    //https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=40.778900199999995&longitude=-73.948848
    try {
      console.log(lat, long);

      const response = await fetch(
        `https://cors-anywhere.herokuapp.com/
        https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=${lat}&longitude=${long}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            Origin: "localhost:8080",
            withCredentials: true,
          },
        }
      );
      console.log("response ", response);
      const resJson = await response.json();
      console.log("reJson is ", resJson);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    console.log("inside useEffect");
    navigator.geolocation.getCurrentPosition(success, error, options);
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
const mapState = (state) => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);
