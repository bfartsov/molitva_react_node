import { GET_BANNERS } from "./types";
import axios from "axios";

export const getBanners = () => async dispach => {
  try {
    const banners = await axios.get("http://localhost:8080/api/banners");
    let title = {};
    let items = [];
    if (banners.data.length > 0) {
      banners.data.forEach(banner => {
        const item = {
          id: banner._id,
          title: banner.title,
          img: banner.banner,
          Date: banner.eventDate
        };
        items.push(item);
      });
    }
    items.length > 0 ? (title = Object.keys(items[0])) : (title = {});
    dispach({
      type: GET_BANNERS,
      payload: { banners: banners.data, title, items }
    });
  } catch (error) {
    console.log(error);
  }
};
