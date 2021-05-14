import React from "react";
import { setCuisineThunk, setPriceThunk } from "../store/restaurants";
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
    this.restaurantSelection = this.restaurantSelection.bind(this);
    console.log("props I get on Map", this.props);
  }

  searchNewCuisine(cuisine, lat, long) {
    this.props._searchCuisine(cuisine, lat, long);
  }
  searchNewPrice(price, lat, long) {
    console.log("price, lat,long", price, lat, long);
    this.props._searchPrice(price, lat, long);
  }
  restaurantSelection(resId) {
    console.log(resId, " got selected");
  }

  render() {
    const restaurantList = this.props.restaurants.map((item) => (
      <div className="restaurant-container" key={item.id}>
        {item.name}
        <p>{item.location.display_address}</p>
        <img className="restaurant-image" src={item.image_url} />
        <button type="button" onClick={() => this.restaurantSelection(item.id)}>
          Select
        </button>
      </div>
    ));
    return (
      <React.Fragment>
        <h1>Map Component Here:</h1>
        <div>{restaurantList}</div>
        <Searches
          searchCuisine={(cuisine, lat, long) =>
            this.searchNewCuisine(cuisine, lat, long)
          }
          searchPrice={(price, lat, long) =>
            this.searchNewPrice(price, lat, long)
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
    _searchCuisine: (cuisine, lat, long) => {
      dispatch(setCuisineThunk(cuisine, lat, long));
    },
    _searchPrice: (price, lat, long) => {
      dispatch(setPriceThunk(price, lat, long));
    },
  };
};

export default connect(mapState, mapDispatch)(Map);
