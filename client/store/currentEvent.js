import axios from 'axios';


const GET_EVENT = 'GET_EVENT';

export const getEvent = event => ({
  type: GET_EVENT,
  event,
});

export const fetchEvent = eventId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/events/${eventId}`);
    //   console.log(data)
      dispatch (getEvent (data));
    } catch (error) {
      console.log (error);
    }
  };
};

export default function singleEventReducer (state = {}, action) {
    switch (action.type) {
      case GET_EVENT:
        return action.event;
      default:
        return state;
    }
  }