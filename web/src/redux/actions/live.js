import { GET_LIVE } from "./types";
import axios from "axios";

export const getLive = () => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_URL;

    const res = await axios.get(`${url}/api/live`);
    console.log(res);
    dispatch({
      type: GET_LIVE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
