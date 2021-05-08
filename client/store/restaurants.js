import axios from "axios";
const initialState = [];

export const SET_RESTAURANTS = "SET_RESTAURANTS";

export const setRestaurants = (restaurants) => {
  return {
    type: SET_RESTAURANTS,
    restaurants,
  };
};

export const setRestaurantsThunk = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/api/yelp");
      const data = response.data;
      dispatch(setRestaurants(data));
    } catch (error) {
      console.log(e);
    }
  };
};

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESTAURANTS: {
      return action.restaurants;
    }
    default:
      return state;
  }
}
