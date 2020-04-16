import { GET_MENUS } from "./types";
import axios from "axios";

export const getMenus = () => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_URL;
    const res = await axios.get(`${url}/api/menus`);
    dispatch({
      type: GET_MENUS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
