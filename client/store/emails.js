const initialState = [];

const SET_EMAILS = 'SET_EMAILS';

const setEmails = emails => {
  return {
    type: SET_EMAILS,
    emails,
  };
};

export const setEmailsThunk = emails => {
  console.log("dispatching these emails:", emails);
  return async dispatch => {
    dispatch (setEmails (emails));
  };
};

export default function emailsReducer (state = initialState, action) {
  switch (action.type) {
    case SET_EMAILS: {
      return action.emails;
    }
    default:
      return state;
  }
}
