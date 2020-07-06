import { GET_EVENTS } from "./types";
import axios from "axios";
import moment from "moment";
import "moment/locale/bg";

export const getEvents = () => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_URL;

    const res = await axios.get(`${url}/api/events/limit/4`);
    console.log(res.data);
    const data = res.data.filter((event) => {
      const now = new Date();
      const today = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
      );
      return new Date(event.date) >= today;
    });
    console.log(data);

    data.forEach((event) => {
      moment.locale("bg");
      const date = moment(event.date, "YYYY-MM-DD");

      event.date = date.format("LL");
      event.shortDate = date.format("DD MMM ");
      return event;
    });

    dispatch({
      type: GET_EVENTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllEvents = () => async (dispatch) => {
  try {
    const url = process.env.REACT_APP_URL;

    const res = await axios.get(`${url}/api/events`);
    const data = res.data.filter((event) => {
      const now = new Date();
      const today = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
      );
      return new Date(event.date) >= today;
    });
    console.log(data);

    data.forEach((event) => {
      moment.locale("bg");
      const date = moment(event.date, "YYYY-MM-DD");

      event.date = date.format("LL");
      event.shortDate = date.format("DD MMM ");
      return event;
    });
    dispatch({
      type: GET_EVENTS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
