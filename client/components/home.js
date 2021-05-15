import React from "react";
import { connect } from "react-redux";

export const Home = (props) => {
  console.log("what are my props at home ", props);
  const { username } = props;

  return (
    <div>
      <h3>Welcomeeee, {username}</h3>
      <button type="button" onClick={() => props.history.push(`/beginsearch`)}>
        Go to search page!
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

//Need to clear cuisiine selection field when search button clicked
//Need to disable cuisine button when its in use
