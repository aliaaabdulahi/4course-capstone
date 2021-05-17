import React from "react";
import { connect } from "react-redux";
import Datetime from "./Datetime";
import { Link } from "react-router-dom";

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
  const upcomingEvents = [
    {
      name: "Event1",
      datetime: "2021-06-01:12:00:00PM",
      assignedRestaurant: "Five Guys",
      assignedCourse: "Main",
    },
    {
      name: "Event2",
      datetime: "2021-06-02:12:00:00PM",
      assignedRestaurant: "Amanda's",
      assignedCourse: "Desserts",
    },
    {
      name: "Event3",
      datetime: "2021-06-15:12:00:00PM",
      assignedRestaurant: "Pizza Hut",
      assignedCourse: "Appetizers",
    },
  ];

  return (
    <div>
      <h3>Welcome, {username}</h3>
      {/* <Datetime/> */}

      <div className="center">
        <form onSubmit={() => props.history.push(`/datetime`)}>
          <input
            className="button bigCircle"
            type="submit"
            value="Start New Challenge"
          />
        </form>
        <div className="row">
          <div className="column">
            <h2>Upcoming Events</h2>
            <div>
              {upcomingEvents.map((event) => (
                <Link to="/event:id">
                  <p>{event.name}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="column">
            <h2>Past Events</h2>
            <div>
              {upcomingEvents.map((event) => (
                <Link to="/event:id">
                  <p>{event.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
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
