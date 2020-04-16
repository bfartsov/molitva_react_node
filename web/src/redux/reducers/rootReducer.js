import { combineReducers } from "redux";
import banners from "./banners";
import events from "./events";
import videos from "./videos";
import news from "./news";
import menus from "./menus";

export default combineReducers({
  banners,
  events,
  videos,
  news,
  menus,
});
