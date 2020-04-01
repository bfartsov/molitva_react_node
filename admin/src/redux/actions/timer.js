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


export const saveTimer = (data, history)=> async dispach =>{
 
  try {
    console.log(data)

    const res = await axios.post("http://localhost:8080/api/timer",data );
  console.log(res)
    res.status ===200 && dispach(setAlert('Updated Successfully', 'success'));
    res.status ===200 && history.push('/timer');
  } catch (error) {
    console.log(error)
  }

}

