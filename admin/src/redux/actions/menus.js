import { GET_MENUS_FRONT, REMOVE_MENU_SUCCESS } from "./types";
import { setAlert } from "./alert";
import axios from "axios";

export const getFrontMenus = () => async (dispach) => {
  try {
    const menus = await axios.get("http://localhost:8080/api/menus");

    dispach({
      type: GET_MENUS_FRONT,
      payload: { menus: menus.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeMenu = (id, history) => async (dispach) => {
  try {
    const res = await axios.delete(`http://localhost:8080/api/menus/${id}`);
    console.log(res);
    dispach({
      type: REMOVE_MENU_SUCCESS,
      payload: id,
    });
    dispach(setAlert("Item deleted", "success"));
    res.status === 200 && dispach(getFrontMenus());

    res.status === 200 && history.push("/menus");
  } catch (error) {
    console.log(error);
  }
};

export const addMenu = (data, history) => async (dispach) => {
  try {
    console.log(data);

    const res = await axios.post("http://localhost:8080/api/menus", data);
    console.log(res);
    res.status === 200 && dispach(setAlert("Updated Successfully", "success"));
    res.status === 200 && dispach(getFrontMenus());

    res.status === 200 && history.push("/menus");
  } catch (error) {
    console.log(error.response.data.msg);
    error.response.data.msg.map((er) => dispach(setAlert(er.text, "danger")));
  }
};
export const editMenu = (data, history, id, url) => async (dispach) => {
  try {
    console.log(data);

    const res = await axios.put(`http://localhost:8080/api/menus/${id}`, data);
    console.log(res);
    res.status === 200 && dispach(setAlert("Updated Successfully", "success"));
    res.status === 200 && dispach(getFrontMenus());

    res.status === 200 && history.push(url);
  } catch (error) {
    console.log(error);
  }
};
