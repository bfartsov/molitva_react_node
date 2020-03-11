import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import videos from "./videos";

export default combineReducers({
  alert,
  auth,
  videos
});
