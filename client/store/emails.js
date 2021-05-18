import axios from "axios";
const initialState = [];

const SET_EMAILS = "SET_EMAILS";

const setEmails = (emails) => {
  return {
    type: SET_EMAILS,
    emails,
  };
};

export const setEmailsThunk = (emails, id) => {
  console.log("dispatching these emails:", emails);
  return async (dispatch) => {
    const { data } = await axios.put(`/api/events/${id}/invitees`, emails);
    console.log(data);
    dispatch(setEmails(emails));
  };
};

export default function emailsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_EMAILS: {
      return action.emails;
    }
    default:
      return state;
  }
}
