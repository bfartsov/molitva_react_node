import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export const setAlert = (msg, alertType) => dispach => {
  const id = uuid.v4();
  dispach({ type: SET_ALERT, payload: { msg, alertType, id } });
};
