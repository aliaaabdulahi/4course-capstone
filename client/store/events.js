import axios from "axios";

export const SET_UPCOMING_EVENTS = "SET_UPCOMING_EVENTS";
export const SET_PAST_EVENTS = "SET_PAST_EVENTS";
export const SET_USERS_UPCOMING_EVENT = "SET_USERS_UPCOMING_EVENT";

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
