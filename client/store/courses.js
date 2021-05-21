import axios from "axios";

export const SET_ASSIGNMENTS = "SET_ASSIGNMENTS";

export const setAssignments = (assignments) => {
  return {
    type: SET_ASSIGNMENTS,
    assignments,
  };
};

export const setAssignmentsThunk = (eventId, assignments) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/courses/${eventId}`, assignments);
      dispatch(setAssignments(assignments));
    } catch (err) {
      console.log(err);
    }
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
