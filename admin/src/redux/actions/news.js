import { GET_NEWS, REMOVE_NEWS_SUCCESS } from "./types";
import {setAlert} from './alert'
import axios from "axios";

export const getNews = () => async dispach => {
  try {
    const res = await axios.get("http://localhost:8080/api/news");

    dispach({
      type: GET_NEWS,
      payload: { news: res.data }
    });

  } catch (error) {
    console.log(error);
  }
};

export const removeNews = (id)=> async dispach =>{
  try {
    const res = await axios.delete(`http://localhost:8080/api/news/${id}`)
    console.log(res)
    dispach({
      type:REMOVE_NEWS_SUCCESS,
      payload: id
    })
    dispach(setAlert('Item deleted', 'success'))
  } catch (error) {
    console.log(error)
  }
};

export const saveNews = (data, history)=> async dispach =>{
  console.log(data)
 
  let formData = new FormData();
  for ( var key in data ) {
    formData.append(key, data[key]);
};

  const res = await axios.post("http://localhost:8080/api/news",formData );

  res.status ===200 && dispach(setAlert('Updated Successculy', 'success'));
  res.status ===200 && dispach(getNews());

  res.status ===200 && history.push('/news')

}
