import { SAVE } from "./types";
import axios from "axios";

export const save = (url, data) => async dispach => {
  try {
    let formData = new FormData();
    formData.append("img", data.img);
    const res = await axios.put(url, formData);
    console.log(res);
  } catch (error) {
    console.log(error.response);
  }
};
