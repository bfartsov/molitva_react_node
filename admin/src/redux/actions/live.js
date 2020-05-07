import { GET_LIVE } from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const getLive = () => async (dispach) => {
  try {
    const res = await axios.get("http://localhost:8080/api/live");

    dispach({
      type: GET_LIVE,
      payload: { live: res.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveLive = (data, history) => async (dispach) => {
  try {
    const res = await axios.post("http://localhost:8080/api/live", data);
    dispach(getLive());
    res.status === 200 && dispach(setAlert("Updated Successfully", "success"));

    res.status === 200 && history.push("/live");
  } catch (error) {
    if (error.response.status === 400) {
      console.log();
      const msg = error.response.data.error.msg;
      dispach(setAlert(msg, "danger"));
      console.log(error.response);
    }
  }
};
