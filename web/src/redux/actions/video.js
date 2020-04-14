import { GET_HOMEPAGE_VIDEOS } from "./types";

import axios from "axios";

export const getHomePageVideos = () => async (dispatch) => {
  const url = process.env.REACT_APP_URL;
  try {
    const homePageVidoes = await axios.get(`${url}/api/videos/HomePage`);
    dispatch({
      type: GET_HOMEPAGE_VIDEOS,
      payload: homePageVidoes.data,
    });
  } catch (error) {
    console.log(error);
  }
};
