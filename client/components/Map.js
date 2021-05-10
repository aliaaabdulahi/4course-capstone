import React from "react";
import { setRestaurantsThunk, setCuisineThunk } from "../store/restaurants";
import { connect } from "react-redux";
import MapView from "./MapView";
import Searches from "./Searches";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = { lng: -73.9784895, lat: 40.7850574 };
    this.options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0,
    };
    this.success = this.success.bind(this);
    this.error = this.error.bind(this);

    console.log("props I get on Map", this.props);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      this.success,
      this.error,
      this.options
    );
    /*let lat = this.props.match.params.lat;
    let long = this.props.match.params.long;
    this.props._getRestaurants(lat, long);
    */
  }
  searchNewCuisine(cuisine, lat, long) {
    console.log("cuisine,long,lat", cuisine, lat, long);
    this.props._searchCuisine(cuisine, lat, long);
  }

  success(pos) {
    var crd = pos.coords;
    console.log("Your current position is:");
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    this.setState({ lng: crd.longitude, lat: crd.latitude });
    this.props._getRestaurants(this.state.lat, this.state.lng);
  }

  error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

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
          lat={this.props.match.params.lat}
          long={this.props.match.params.long}
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
    _getRestaurants: (lat, long) => {
      dispatch(setRestaurantsThunk(lat, long));
    },
    _searchCuisine: (cuisine, lat, long) => {
      dispatch(setCuisineThunk(cuisine, lat, long));
    },
  };
};

export default connect(mapState, mapDispatch)(Map);
