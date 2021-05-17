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

export const createNewEventThunk = (date) => {
  return async (dispatch) => {
    try {
      console.log("creating event", date);
      const { data } = await axios.post(`/api/events`, {date});
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
      const { data } = await axios.put(`/api/events`, {id, date});
      dispatch(setUpdateEvent(data));
    } catch (err) {
      console.log(err);
    }
  };
};
