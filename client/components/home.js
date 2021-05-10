import React from "react";
import { connect } from "react-redux";

/**
 * COMPONENT
 */
export const Home = (props) => {
  console.log("what are my props at home ", props);
  const { username } = props;

  /*
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

  */

  // useEffect(() => {
  //   console.log("inside useEffect");
  //   navigator.geolocation.getCurrentPosition(success, error, options);
  // });

  return (
    <div>
      <h3>Welcomeeee, {username}</h3>
      <button type="button" onClick={() => props.history.push(`/yelp`)}>
        See Restaurants Near You!
      </button>
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
