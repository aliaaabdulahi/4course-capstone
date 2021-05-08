import React from "react";
import { setRestaurantsThunk } from "../store/restaurants";
import { connect } from "react-redux";
import MapView from "./MapView";

class Map extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props._getRestaurants();
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
    _getRestaurants: () => {
      dispatch(setRestaurantsThunk());
    },
  };
};

export default connect(mapState, mapDispatch)(Map);
