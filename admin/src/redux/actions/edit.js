import { EDIT } from "./types";
import axios from "axios";

export const edit = (category, id, subMenu) => async dispatch => {
  try {
    const res =
      category === "live"
        ? await axios.get(`http://localhost:8080/api/${category}`)
        : await axios.get(`http://localhost:8080/api/${category}/id/${id}`);
        
    dispatch({ type: EDIT, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
