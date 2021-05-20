import axios from "axios";

export const SET_ASSIGNMENTS = "SET_ASSIGNMENTS";

export const setAssignments = (assignments) => {
  return {
    type: SET_ASSIGNMENTS,
    assignments,
  };
};

const initialState = {};

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ASSIGNMENTS:
      return action.assignments;
    default:
      return state;
  }
}
