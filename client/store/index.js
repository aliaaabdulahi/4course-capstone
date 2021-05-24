import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import restaurantReducer from "./restaurants";
import emails from "./emails";
import restaurantSelectionReducer from "./restaurantSelections";
import eventsReducer from "./events";
import singleEventReducer from "./currentEvent"
import coursesReducer from "./courses";
import userReducer from "./user";

const reducer = combineReducers({
  auth,
  restaurants: restaurantReducer,
  emails,
  restaurantSelections: restaurantSelectionReducer,
  events: eventsReducer,
  singleEvent: singleEventReducer,
  courses: coursesReducer,
  user: userReducer
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
