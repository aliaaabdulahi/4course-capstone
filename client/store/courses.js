import axios from "axios";

export const SET_ASSIGNMENTS = "SET_ASSIGNMENTS";
export const GET_ASSIGNMENTS = "GET_ASSIGNMENTS";

export const setAssignments = (course) => {
  return {
    type: SET_ASSIGNMENTS,
    course,
  };
};

export const getAssignments = (courses) => {
  return {
    type: GET_ASSIGNMENTS,
    courses,
  };
};

export const setAssignmentsThunk = (eventId, course) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/courses/${eventId}`, course);
      dispatch(setAssignments(course));
    } catch (err) {
      console.log(err);
    }
  };
};

export const getAssignmentsThunk = (eventId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/courses/${eventId}`);
      dispatch(getAssignments(data));
    } catch (err) {
      console.log(err);
    }
  };
};
const initialState = {
  courses: [],
  course: {}
};

export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ASSIGNMENTS:
      return action.course;
    case GET_ASSIGNMENTS:
        return action.courses;
    default:
      return state;
  }
}
