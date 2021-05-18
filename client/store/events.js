import axios from "axios";

export const SET_UPCOMING_EVENTS = "SET_UPCOMING_EVENTS";
export const SET_PAST_EVENTS = "SET_PAST_EVENTS";
export const SET_USERS_UPCOMING_EVENT = "SET_USERS_UPCOMING_EVENT";
export const SET_NEW_EVENT = "SET_NEW_EVENT";
export const SET_UPDATE_EVENT = "SET_UPDATE_EVENT";

export const setUpcomingEvents = (events) => {
  return {
    type: SET_UPCOMING_EVENTS,
    events,
  };
};

export const setPastEvents = (events) => {
  return {
    type: SET_PAST_EVENTS,
    events,
  };
};

export const setUsersUpcomingEvent = (users) => {
  return {
    type: SET_USERS_UPCOMING_EVENT,
    users,
  };
};

export const setNewEvent = (event) => {
  return {
    type: SET_NEW_EVENT,
    event,
  };
};

export const setUpdateEvent = (event) => {
  return {
    type: SET_UPDATE_EVENT,
    event,
  };
};

export const upcomingEventsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/upcoming/${userId}`);
      dispatch(setUpcomingEvents(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const pastEventsThunk = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/past/${userId}`);
      dispatch(setUpcomingEvents(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const usersInUpcomingEventThunk = (eventId, userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/upcoming/${userId}/${eventId}/users`);
      dispatch(setUsersUpcomingEvent(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const createNewEventThunk = (date, id) => {
  return async (dispatch) => {
    try {
      console.log("creating event", date, id);
      const { data } = await axios.post(`/api/events/${id}`, { date, id });
      console.log("event created", data);
      dispatch(setNewEvent(data));
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateEventThunk = (id, date) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/events/${id}`, { id, date });
      dispatch(setUpdateEvent(data));
    } catch (err) {
      console.log(err);
    }
  };
};

const initialState = {};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEW_EVENT:
      return action.event;
    default:
      return state;
  }
}

const GET_EVENT = "GET_EVENT";

export const getEvent = (event) => ({
  type: GET_EVENT,
  event,
});

export const fetchEvent = (eventId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/events/${eventId}`);
      dispatch(getEvent(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const SUBMIT_EVENT = "SUBMIT_EVENT";

export const submitEvent = (event) => ({
  type: SUBMIT_EVENT,
  event,
});
export const eventThunk = (userId, eventId, history) => {
  return async (dispatch) => {
    try {
      let response;
      response = await axios.put(`/api/events/${eventId}${userId}`);
      dispatch(submitEvent(response.data));
      // history.push('/thankyou');
    } catch (error) {
      console.log(error);
    }
  };
};
