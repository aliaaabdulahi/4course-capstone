import axios from "axios";
import restaurantReducer from "./restaurants";

export const SET_RESTAURANT_SELECTIONS = "SET_RESTAURANT_SELECTIONS";

export const setRestaurantSelections = (restaurantSelections) => {
  return {
    type: SET_RESTAURANT_SELECTIONS,
    restaurantSelections,
  };
};

export const restaurantSelectionThunk = (id, array) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/events/${id}/restaurants`, array);
      console.log("datainthunk", data);
      dispatch(setRestaurantSelections(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = [];

export default function restaurantSelectionReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case SET_RESTAURANT_SELECTIONS:
      return action.restaurantSelections;
    default:
      return state;
  }
}
