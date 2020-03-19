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
}