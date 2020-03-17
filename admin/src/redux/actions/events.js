import { GET_EVENTS, REMOVE_EVENT_SUCCESS} from "./types";
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
export const removeEvent = id=> async dispach=>{
  try {
    console.log('banners');
    const event = await axios.delete(`http://localhost:8080/api/events/${id}`);
    
    dispach({
      type: REMOVE_EVENT_SUCCESS,
      payload: id
    });
    dispach(setAlert('Item deleted', 'success'))

  } catch (error) {
    console.log(error)
  }


}



