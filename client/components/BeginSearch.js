import React from "react";
import { connect } from "react-redux";
import { setRestaurantsThunk, setLocationThunk } from "../store/restaurants";
import Map from "./Map.js";

const initialState = {
  location: "",
  lng: null,
  lat: null,
  renderMode: "ask",
  centerLocation: {
    latitude: null,
    longitude: null,
  },
};

class BeginSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
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
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleSubmit(e) {
    e.preventDefault(e);
    this.setState({
      renderMode: "currentCoordinates",
    });
  }
  /*
  handleLocationSubmit(e) {
    e.preventDefault(e);
    const newLocation = this.state.location.toLowerCase();
    console.log("newLocation is", newLocation);
    this.props._searchLocation(newLocation);
    this.setState({
      renderMode: "byLocation",
    });
  }
  */
  render() {
    if (this.state.renderMode === "currentCoordinates") {
      return <Map lng={this.state.lng} lat={this.state.lat} />;
    }
    if (this.state.renderMode === "byLocation") {
      return (
        <Map
          location={this.state.location}
          lat={this.props.centerLocation.latitude}
          lng={this.props.centerLocation.longitude}
        />
      );
    } else {
      return (
        <div className="begin-search">
          <form>
            <h1>Where are we Starting?</h1>
            <h4>Enter a city, neighborhood or zipcode: </h4>
            <input type="text" name="location" onChange={this.handleChange} />
            <button type="submit" onClick={this.handleLocationSubmit}>
              Search
            </button>
          </form>
          <form>
            <h4>Search By Current Location: </h4>
            <button type="button" onClick={this.handleSubmit}>
              Search
            </button>
          </form>
        </div>
      );
    }
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
    _searchLocation: (location) => {
      dispatch(setLocationThunk(location));
    },
  };
};

export default connect(mapState, mapDispatch)(BeginSearch);
