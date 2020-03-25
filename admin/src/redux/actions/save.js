import { SAVE } from "./types";
import { setAlert } from "./alert";

import axios from "axios";

export const save = (url, data) => async dispach => {
  try {
    let formData = new FormData();
    for ( var key in data ) {
      formData.append(key, data[key]);
  };
    const res = await axios.put(url, formData);
    dispach({
      type: SAVE,
      payload: res.data
    });
    res.status ===200 && dispach(setAlert('Item edited', 'success'));

  } catch (error) {
    console.log(error.response);
  }
};
