import React from "react";
import { connect } from "react-redux";
import { setRestaurantsThunk, setLocationThunk } from "../store/restaurants";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Map from "./Map.js";
import Anime3 from "./Anime3";
import Paper from "@material-ui/core/Paper";
import SearchIcon from "@material-ui/icons/Search";
import sushiPic from "../../public/sushi.png";
import breakfast from "../../public/Breakfast.png";
import fries from "../../public/fries.png";
import drinks from "../../public/drinks.png";

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
    e.preventDefault();
    this.setState({
      renderMode: "currentCoordinates",
    });
  }
  handleLocationSubmit(e) {
    e.preventDefault();
    const newLocation = this.state.location.toLowerCase();
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
              <div />
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
            history={this.props.history}
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
            history={this.props.history}
          />
        );
      } else {
        return (
          <React.Fragment >
            <div className="begin-search">
              <div id="search-text">
                <Paper elevation={6} justify="center">
                  <div id="begin-images">
                    <img
                      className="begin-search-pics"
                      src={sushiPic}
                      alt="sushi pic"
                    />
                    <img
                      className="begin-search-pics"
                      src={breakfast}
                      alt="breakfast"
                    />
                    <img
                      className="begin-search-pics"
                      src={fries}
                      alt="fries"
                    />
                    <img
                      className="begin-search-pics"
                      src={drinks}
                      alt="drinks"
                    />
                  </div>
                  <div id="pick-location-header">
                    <Paper elevation={5}>
                      {" "}
                      <h1 className="coral-font">PICK A STARTING POINT: </h1>
                    </Paper>
                  </div>
                  <div id="location-forms">
                    <form className="begin-search-form">
                      <h3 className="coral-font">
                        Enter a city,
                        <br />
                        neighborhood (i.e."Chelsea,NY")
                        <br />
                        or zip-code:
                      </h3>
                      <div id="text-field">
                        <TextField
                          placeholder="city, neighborhood, zip-code"
                          type="text"
                          name="location"
                          variant="outlined"
                          style={{ width: 315 }}
                          color="secondary"
                          onChange={this.handleChange}
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon fontSize="small" />
                              </InputAdornment>
                            ),
                          }}
                        />{" "}
                        <div>
                          <Button
                            className="buttons"
                            type="submit"
                            variant="contained"
                            onClick={this.handleLocationSubmit}
                          >
                            Search
                          </Button>
                        </div>
                      </div>
                    </form>
                    <h1 id="or-header" className="coral-font">
                      OR
                    </h1>
                    <form className="begin-search-form">
                      <h3 className="coral-font">
                        Search By
                        <br />
                        Current Location:{" "}
                      </h3>
                      <Button
                        className="buttons"
                        type="button"
                        variant="contained"
                        onClick={this.handleSubmit}
                      >
                        Search
                      </Button>
                    </form>
                  </div>
                </Paper>
              </div>
              <div id="restaurant-animation">
                <Anime3 />
              </div>
            </div>
          </React.Fragment>
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
