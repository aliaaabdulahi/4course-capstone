const initialState = {};

export const SET_LOCAL_COORDINATES = "SET_LOCAL_COORDINATES";

export const setLocalCoordinates = (centerLocation) => {
  return {
    type: SET_LOCAL_COORDINATES,
    centerLocation,
  };
};

export default function localReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOCAL_COORDINATES: {
      return action.centerLocation;
    }
    default:
      return state;
  }
}
