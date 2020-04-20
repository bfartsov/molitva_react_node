import { GET_NATIONAL_PRAYER } from "./types";

import axios from "axios";

export const getPrayer = (year) => async (dispatch) => {
  const url = process.env.REACT_APP_URL;
  try {
    const res = await axios.get(`${url}/api/nationalprayers/${year}`);
    dispatch({
      type: GET_NATIONAL_PRAYER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
