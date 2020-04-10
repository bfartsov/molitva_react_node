import { GET_BANNERS } from "./types";

import axios from "axios";

export const getBanners = () => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_URL;
    const res = await axios.get(`${url}/api/banners`);
    dispatch({
      type: GET_BANNERS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
