import React from "react";
import { setCuisineThunk } from "../store/restaurants";
import { connect } from "react-redux";
import MapView from "./MapView";
import RestaurantContainer from "./RestaurantContainer";
import Searches from "./Searches";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme.js";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.lng,
      lat: this.props.lat,
      location: this.props.location,
      price: null,
      rating: null,
      selections: [],
    };
    this.restaurantSelection = this.restaurantSelection.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    console.log("props I get on Map", this.props);
  }
  searchNewCuisine(cuisine, lat, long) {
    this.props._searchCuisine(cuisine, lat, long);
  }
  restaurantSelection(resId, resName) {
    if (this.state.selections.length === 4) {
      window.alert("Please remove choice before continuing");
    } else {
      let pickedTwice = "";
      this.state.selections.forEach((item) => {
        if (item.yelpId === resId) {
          pickedTwice = item.yelpId;
        }
      });
      if (pickedTwice !== "") {
        window.alert("Can't pick restaurant twice! Please pick another!");
      } else {
        let restaurantObject = {
          yelpId: resId,
          yelpName: resName,
        };
        this.setState({
          selections: [...this.state.selections, restaurantObject],
        });
      }
    }
  }
  removeSelection(resId) {
    this.setState({
      selections: this.state.selections.filter((item) => {
        return item.yelpId !== resId;
      }),
    });
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log("state here is ", this.state);
  }
  handleRadioChange(e) {
    console.log(e.target.value);
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
    });
    console.log(this.state);
  }

  render() {
    //price
    //rating
    let resList = this.props.restaurants;
    if (this.state.rating !== null && this.state.rating !== "all") {
      resList = resList.filter((item) => {
        return item.rating === parseFloat(this.state.rating);
      });
    }
    if (this.state.price !== null && this.state.price !== "all") {
      resList = resList.filter((item) => {
        return item.price === this.state.price;
      });
    }
    return (
      <ThemeProvider theme={theme}>
        <RestaurantContainer
          resSelections={this.state.selections}
          removal={(resId) => this.removeSelection(resId)}
        />
        <h1>Map Component Here:</h1>
        <Searches
          searchCuisine={(cuisine, lat, long) =>
            this.searchNewCuisine(cuisine, lat, long)
          }
          lat={this.state.lat}
          lng={this.state.lng}
          resClear={(latitude, longitude) =>
            this.props.restaurantsList(latitude, longitude)
          }
        />
        <form>
          <h3>Rating:</h3>
          <label>
            5
            <input
              type="radio"
              name="rating"
              value="5"
              checked={this.state.rating === "5"}
              onChange={this.handleRadioChange}
            />
          </label>
          <label>
            4.5
            <input
              type="radio"
              name="rating"
              value="4.5"
              checked={this.state.rating === "4.5"}
              onChange={this.handleRadioChange}
            />
          </label>
          <label>
            4
            <input
              type="radio"
              name="rating"
              value="4"
              checked={this.state.rating === "4"}
              onChange={this.handleRadioChange}
            />
          </label>
          <label>
            All
            <input
              type="radio"
              name="rating"
              value="all"
              checked={this.state.rating === "all"}
              onChange={this.handleRadioChange}
            />
          </label>
        </form>
        <form>
          <h3>Price:</h3>
          <label>
            $$$$
            <input
              type="radio"
              name="price"
              value="$$$$"
              checked={this.state.price === "$$$$"}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            $$$
            <input
              type="radio"
              name="price"
              value="$$$"
              checked={this.state.price === "$$$"}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            $$
            <input
              type="radio"
              name="price"
              value="$$"
              checked={this.state.price === "$$"}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            $
            <input
              type="radio"
              name="price"
              value="$"
              checked={this.state.price === "$"}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            All
            <input
              type="radio"
              name="price"
              value="all"
              checked={this.state.price === "all"}
              onChange={this.handleInputChange}
            />
          </label>
        </form>
        <div>
          {resList.map((item) => (
            <div className="restaurant-container" key={item.id}>
              {item.name}
              <p>{item.location.display_address}</p>
              <img className="restaurant-image" src={item.image_url} />
              <button
                type="button"
                onClick={() => this.restaurantSelection(item.id, item.name)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
        <MapView
          restaurants={resList}
          lng={this.state.lng}
          lat={this.state.lat}
        />
      </ThemeProvider>
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
  };
};

export default connect(mapState, mapDispatch)(Map);
