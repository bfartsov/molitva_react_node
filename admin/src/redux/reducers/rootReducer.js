import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import videos from "./videos";
import events from "./events";
import banners from "./banners";
import edit from "./edit";
import save from "./save";

export default combineReducers({
  alert,
  auth,
  videos,
  banners,
  edit,
  save,
  events
});
