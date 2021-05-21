import React from "react";
import { setCuisineThunk } from "../store/restaurants";
import { connect } from "react-redux";
import MapView from "./MapView";
import RestaurantContainer from "./RestaurantContainer";
import Searches from "./Searches";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../theme.js";
import { restaurantSelectionThunk } from "../store/restaurantSelections";

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
    console.log("My props on Map component are", this.props);
    this.restaurantSelection = this.restaurantSelection.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addSelectionsToStore = this.addSelectionsToStore.bind(this);
  }
  searchNewCuisine(cuisine, lat, long) {
    this.props._searchCuisine(cuisine, lat, long);
  }
  restaurantSelection(resId, resName, resImageUrl) {
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
          yelpImageUrl: resImageUrl,
        };
        this.setState({
          selections: [...this.state.selections, restaurantObject],
        });
      }
    }
  }
  addSelectionsToStore() {
    if (this.state.selections.length === 4) {
      this.props.setRestaurantSelections(
        this.props.eventId,
        this.state.selections
      );
      this.props.history.push("/emails");
    } else {
      window.alert("Please make four selections!");
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
  }
  handleRadioChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
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
          addSelectionsToStore={this.addSelectionsToStore}
        />
        <div id="main-map-container">
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
          <div id="main-rating-container">
            <form className="yellow-font">
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
                Clear
                <input
                  type="radio"
                  name="rating"
                  value="all"
                  checked={this.state.rating === "all"}
                  onChange={this.handleRadioChange}
                />
              </label>
            </form>
            <form className="yellow-font">
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
                Clear
                <input
                  type="radio"
                  name="price"
                  value="all"
                  checked={this.state.price === "all"}
                  onChange={this.handleInputChange}
                />
              </label>
            </form>
            <MapView
              restaurants={resList}
              lng={this.state.lng}
              lat={this.state.lat}
            />
          </div>
          <div id="body-container">
            <div className="restaurant-container">
              {resList.map((item) => (
                <div className="res-card" key={item.id}>
                  {item.name}
                  <div>
                    <p>{item.location.display_address}</p>
                    <img className="restaurant-image" src={item.image_url} />
                    <button
                      type="button"
                      onClick={() =>
                        this.restaurantSelection(
                          item.id,
                          item.name,
                          item.image_url
                        )
                      }
                    >
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}
const mapState = (state) => ({
  restaurants: state.restaurants,
  eventId: state.events.event.id,
});

const mapDispatch = (dispatch) => {
  return {
    _searchCuisine: (cuisine, lat, long) => {
      dispatch(setCuisineThunk(cuisine, lat, long));
    },
    setRestaurantSelections: (id, array) =>
      dispatch(restaurantSelectionThunk(id, array)),
  };
};

export default connect(mapState, mapDispatch)(Map);
