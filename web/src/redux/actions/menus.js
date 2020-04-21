import { GET_MENUS } from "./types";
import axios from "axios";

export const getMenus = () => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_URL;
    const res = await axios.get(`${url}/api/menus`);
    const sortedMenus = res.data.map((item) => {
      const menu = { ...item };
      item.subMenu &&
        item.subMenu.sort((a, b) => {
          return a.order - b.order;
        });
      return menu;
    });
    dispatch({
      type: GET_MENUS,
      payload: sortedMenus,
    });
  } catch (error) {
    console.log(error);
  }
};
