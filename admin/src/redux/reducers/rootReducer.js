import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import videos from "./videos";
import banners from "./banners";
import edit from "./edit";

export default combineReducers({
  alert,
  auth,
  videos,
  banners,
  edit
});
