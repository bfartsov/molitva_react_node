import { SAVE } from "./types";
import axios from "axios";

export const save = (url, data) => async dispach => {
  try {
    let formData = new FormData();
    console.log(formData)
    for ( var key in data ) {
      formData.append(key, data[key]);
  }
  console.log(formData)
    const res = await axios.put(url, formData);
    console.log(res)
  } catch (error) {
    console.log(error.response);
  }
};
