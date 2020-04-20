import { combineReducers } from "redux";
import banners from "./banners";
import events from "./events";
import videos from "./videos";
import news from "./news";
import menus from "./menus";
import live from "./live";
import nationalPrayer from "./nationalPrayer";

export default combineReducers({
  banners,
  events,
  videos,
  news,
  menus,
  live,
  nationalPrayer,
});
