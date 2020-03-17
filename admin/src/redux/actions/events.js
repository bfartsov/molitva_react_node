import { GET_EVENTS} from "./types";
import {setAlert} from './alert'
import axios from "axios";

export const getEvents = () => async dispach => {
  try {
    const events = await axios.get("http://localhost:8080/api/events");

    dispach({
      type: GET_EVENTS,
      payload: { events: events.data }
    });

  } catch (error) {
    console.log(error);
  }
};


