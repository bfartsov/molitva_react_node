import { GET_BANNERS } from "./types";

import axios from "axios";

export const getBanners = () => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_URL;
    const res = await axios.get(`${url}/api/banners`);
    const data = res.data.filter((banner) => {
      const now = new Date();
      const today = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
      );
      return new Date(banner.eventDate) >= today;
    });
    console.log(data);
    dispatch({
      type: GET_BANNERS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
