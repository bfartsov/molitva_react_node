import { GET_EVENTS } from "./types";
import axios from "axios";

export const getEvents = () => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_URL;

    const res = await axios.get(`${url}/api/events/limit/4`);
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = () => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_URL;

    const res = await axios.get(`${url}/api/events`);
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
