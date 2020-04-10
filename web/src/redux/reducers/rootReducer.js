import { combineReducers } from "redux";
import banners from "./banners";
import events from "./events";

export default combineReducers({
  banners,
  events,
});
