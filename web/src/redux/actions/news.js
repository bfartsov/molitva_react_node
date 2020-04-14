import { GET_HOMEPAGE_NEWS } from "./types";
import axios from "axios";

export const getHomePageNews = () => async (dispatch) => {
  const url = process.env.REACT_APP_URL;
  try {
    const res = await axios.get(`${url}/api/news/limit/2`);
    console.log(res);
    dispatch({
      type: GET_HOMEPAGE_NEWS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
