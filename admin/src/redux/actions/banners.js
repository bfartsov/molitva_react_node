import { GET_BANNERS, REMOVE_BANNER_SUCCESS } from "./types";
import { setAlert } from "./alert";

import axios from "axios";

export const getBanners = () => async (dispach) => {
  try {
    const banners = await axios.get("http://localhost:8080/api/banners");
    console.log("banners");
    dispach({
      type: GET_BANNERS,
      payload: { banners: banners.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeBanner = (id) => async (dispach) => {
  try {
    console.log("banners");
    const banner = await axios.delete(
      `http://localhost:8080/api/banners/${id}`
    );
    console.log(banner);
    dispach({
      type: REMOVE_BANNER_SUCCESS,
      payload: id,
    });
    dispach(setAlert("Successfully removed", "success"));
  } catch (error) {
    console.log(error);
  }
};

export const saveBanner = (data, history) => async (dispach) => {
  let formData = new FormData();
  for (var key in data) {
    formData.append(key, data[key]);
  }

  try {
    const res = await axios.post("http://localhost:8080/api/banners", formData);
    res.status === 200 && dispach(setAlert("Added Successfully", "success"));
    res.status === 200 && dispach(getBanners);
    res.status === 200 && history.push("/banners");
  } catch (error) {
    if ((error.response.status = 400)) {
      const msg = error.response.data.error.msg;
      dispach(setAlert(msg, "danger"));
      console.log(error.response);
    }
  }
};
