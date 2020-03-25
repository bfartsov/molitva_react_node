import { GET_TIMER } from "./types";
import {setAlert} from './alert'
import axios from "axios";

export const getTimer = () => async dispach => {
  try {
    const timer = await axios.get("http://localhost:8080/api/timer");

    dispach({
      type: GET_TIMER,
      payload: timer.data
    });

  } catch (error) {
    console.log(error);
  }
};

