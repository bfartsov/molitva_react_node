import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import videos from "./videos";
import banners from "./banners";

export default combineReducers({
  alert,
  auth,
  videos,
  banners
});
