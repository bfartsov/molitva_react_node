import { GET_PRAYERS } from "./types";
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
