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


};

export const saveEvent = (data, history)=> async dispach =>{
  console.log(data)
 
  let formData = new FormData();
  for ( var key in data ) {
    formData.append(key, data[key]);
};
try {
  const res = await axios.post("http://localhost:8080/api/events",formData );
  res.status ===200 && dispach(setAlert('Updated Successculy', 'success'));
  res.status ===200 && history.push('/events')
} catch (error) {
  console.log(error)
}

  

}



