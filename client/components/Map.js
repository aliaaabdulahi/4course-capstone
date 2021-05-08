import React from "react";
import { setRestaurantsThunk } from "../store/restaurants";
import { connect } from "react-redux";
import MapView from "./MapView";

class Map extends React.Component {
  constructor(props) {
    super(props);
    console.log("props I get on Map", this.props);
  }
  componentDidMount() {
    let lat = this.props.match.params.lat;
    let long = this.props.match.params.long;
    this.props._getRestaurants(lat, long);
  }

  render() {
    const restaurantList = this.props.restaurants.map((item) => (
      <div key={item.id}>{item.name}</div>
    ));

    return (
      <React.Fragment>
        <h1>Map Component Here:</h1>
        <div>{restaurantList}</div>
        <MapView restaurants={this.props.restaurants} />
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  restaurants: state.restaurants,
});

const mapDispatch = (dispatch) => {
  return {
    _getRestaurants: (lat, long) => {
      dispatch(setRestaurantsThunk(lat, long));
    },
  };
};

export default connect(mapState, mapDispatch)(Map);
