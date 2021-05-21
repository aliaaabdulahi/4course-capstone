import axios from "axios";

export const SET_RESTAURANTS = "SET_RESTAURANTS";
export const SET_CUISINE = "SET_CUISINE";
export const SET_PRICE = "SET_PRICE";

export const setRestaurants = (restaurants) => {
  return {
    type: SET_RESTAURANTS,
    restaurants,
  };
};

export const setRestaurantsThunk = (lat, long) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/yelp/${lat}/${long}`);
      const data = response.data;
      dispatch(setRestaurants(data));
    } catch (error) {
      console.log(e);
    }
  };
};

export const setCuisineThunk = (cuisine, lat, long) => {
  return async (dispatch) => {
    try {
      console.log("lat and long are", lat, long);
      const response = await axios.post(`/api/yelp/cuisine/${lat}/${long}`, {
        cuisine,
      });
      const data = response.data;
      dispatch(setRestaurants(data));
    } catch (error) {
      console.log(e);
    }
  };
};

export const setLocationThunk = (location) => {
  return async (dispatch) => {
    try {
      dispatch(setRestaurants([]));
      const response = await axios.post(`/api/yelp/locations`, {
        location,
      });
      const data = response.data;
      dispatch(setRestaurants(data));
    } catch (error) {
      console.log(e);
    }
  };
};

const initialState = [];

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESTAURANTS: {
      return action.restaurants;
    }
    default:
      return state;
  }
}
