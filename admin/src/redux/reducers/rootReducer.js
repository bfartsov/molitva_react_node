import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import videos from "./videos";
import events from "./events";
import banners from "./banners";
import edit from "./edit";
import save from "./save";
import news from "./news";
import live from "./live";
import menus from "./menus"
export default combineReducers({
  alert,
  auth,
  videos,
  banners,
  edit,
  save,
  events,
  news,
  live,
  menus
});
