import { GET_PRAYERS, REMOVE_PRAYER_SUCCESS } from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const getPrayers = () => async (dispatch) => {
  try {
    const prayers = await axios.get(
      "http://localhost:8080/api/nationalprayers"
    );
    console.log(prayers);
    dispatch({
      type: GET_PRAYERS,
      payload: prayers.data,
    });
  } catch (error) {
    console.log(error.response);
  }
};

export const savePrayer = (data, history) => async (dispach) => {
  console.log(data);

  let formData = new FormData();
  for (var key in data) {
    formData.append(key, data[key]);
  }

  const res = await axios.post(
    "http://localhost:8080/api/nationalprayers",
    formData
  );
  console.log(res);
  res.status === 200 && dispach(setAlert("Updated Successfully", "success"));
  res.status === 200 && dispach(getPrayers());

  res.status === 200 && history.push("/prayers");
};

export const removePrayer = (id) => async (dispach) => {
  try {
    const res = await axios.delete(
      `http://localhost:8080/api/nationalprayers/${id}`
    );

    dispach({
      type: REMOVE_PRAYER_SUCCESS,
      payload: id,
    });
    dispach(setAlert("Item deleted", "success"));
  } catch (error) {
    console.log(error);
  }
};
