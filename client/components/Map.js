import React from "react";
import { setRestaurantsThunk, setCuisineThunk } from "../store/restaurants";
import { connect } from "react-redux";
import MapView from "./MapView";
import Searches from "./Searches";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.lng,
      lat: this.props.lat,
      location: this.props.location,
    };

    console.log("props I get on Map", this.props);
  }

  searchNewCuisine(cuisine, lat, long) {
    console.log("cuisine,long,lat", cuisine, lat, long);
    this.props._searchCuisine(cuisine, lat, long);
  }
  /*
  searchNewLocation(location) {
    this.props._searchLocation(location);
  }
  */

  render() {
    const restaurantList = this.props.restaurants.map((item) => (
      <div key={item.id}>{item.name}</div>
    ));
    return (
      <React.Fragment>
        <h1>Map Component Here:</h1>
        <div>{restaurantList}</div>
        <Searches
          searchCuisine={(cuisine, lat, long) =>
            this.searchNewCuisine(cuisine, lat, long)
          }
          lat={this.state.lat}
          lng={this.state.lng}
        />
        <MapView
          restaurants={this.props.restaurants}
          lng={this.state.lng}
          lat={this.state.lat}
        />
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  restaurants: state.restaurants,
});

const mapDispatch = (dispatch) => {
  return {
    /*
    _getRestaurants: (lat, long) => {
      dispatch(setRestaurantsThunk(lat, long));
    },
    */
    _searchCuisine: (cuisine, lat, long) => {
      dispatch(setCuisineThunk(cuisine, lat, long));
    },
    /*
    _searchLocation: (location) => {
      dispatch(setLocationThunk(location));
    },
    */
  };
};

export default connect(mapState, mapDispatch)(Map);
