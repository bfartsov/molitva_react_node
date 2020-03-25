import { SAVE} from "./types";
import { setAlert } from "./alert";

import axios from "axios";

export const save = (url, data, history, path) => async dispach => {
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
    res.status ===200 && dispach(setAlert('Updated Successculy', 'success'));
    res.status ===200 && history.push(path)
  } catch (error) {
    console.log(error.response);
  }
};
