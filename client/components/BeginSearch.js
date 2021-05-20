import React from "react";
import { connect } from "react-redux";
import { setRestaurantsThunk, setLocationThunk } from "../store/restaurants";
import Button from "@material-ui/core/Button";
import Map from "./Map.js";
import Anime3 from "./Anime3";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import sushiPic from "../../public/sushi.png";

const initialState = {
  location: "",
  lng: null,
  lat: null,
  renderMode: "ask",
};

class BeginSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLocationSubmit = this.handleLocationSubmit.bind(this);
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
  handleLocationSubmit(e) {
    e.preventDefault(e);
    const newLocation = this.state.location.toLowerCase();
    console.log("newLocation is", newLocation);
    this.props._searchLocation(newLocation);
    setTimeout(() => {
      this.setState({
        renderMode: "byLocation",
      });
    }, 600);
  }
  render() {
    if (this.state.lng === null) {
      return (
        <div className="center shape">
          <div>
            <div className="lds-heart">
              <div></div>
            </div>
          </div>
        </div>
      );
    } else {
      if (this.state.renderMode === "currentCoordinates") {
        return (
          <Map
            lng={this.state.lng}
            lat={this.state.lat}
            restaurantsList={(latitude, longitude) =>
              this.props._getRestaurants(latitude, longitude)
            }
          />
        );
      }
      if (
        this.state.renderMode === "byLocation" &&
        this.props.restaurants.length !== 0
      ) {
        return (
          <Map
            location={this.state.location}
            lat={this.props.restaurants[0].coordinates.latitude}
            lng={this.props.restaurants[0].coordinates.longitude}
            restaurantsList={(latitude, longitude) =>
              this.props._getRestaurants(latitude, longitude)
            }
          />
        );
      } else {
        return (
          <Grid container spacing={10} className="begin-search">
            <Grid item xs={6} id="search-text">
              <img src={sushiPic} alt="sushi" id="sushi-pic" />
              <form>
                <h1>Where are we Starting?</h1>
                <h4>Enter a city, neighborhood or zipcode: </h4>
                <input
                  type="text"
                  name="location"
                  onChange={this.handleChange}
                />
                <Button
                  className="buttons"
                  type="submit"
                  variant="contained"
                  onClick={this.handleLocationSubmit}
                >
                  Search
                </Button>
              </form>
              <form>
                <h4>Search By Current Location: </h4>
                <Button
                  className="buttons"
                  type="button"
                  variant="contained"
                  onClick={this.handleSubmit}
                >
                  Search
                </Button>
              </form>
            </Grid>
            <Grid item xs={6} className="restaurant-animation">
              <Anime3 />
            </Grid>
          </Grid>
        );
      }
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
