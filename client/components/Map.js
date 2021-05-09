import React from "react";
import { setRestaurantsThunk, setCuisineThunk } from "../store/restaurants";
import { connect } from "react-redux";
import MapView from "./MapView";
import Searches from "./Searches";

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
  searchNewCuisine(cuisine, lat, long) {
    console.log("cuisine,long,lat", cuisine, lat, long);
    this.props._searchCuisine(cuisine, lat, long);
  }

  render() {
    const restaurantList = this.props.restaurants.map((item) => (
      <div key={item.id}>{item.name}</div>
    ));

    return (
      <React.Fragment>
        <h1>Your Course Is: Apps!!!</h1>
        <div>{restaurantList}</div>
        <Searches
          searchCuisine={(cuisine, lat, long) =>
            this.searchNewCuisine(cuisine, lat, long)
          }
          lat={this.props.match.params.lat}
          long={this.props.match.params.long}
        />
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
    _searchCuisine: (cuisine, lat, long) => {
      dispatch(setCuisineThunk(cuisine, lat, long));
    },
  };
};

export default connect(mapState, mapDispatch)(Map);
