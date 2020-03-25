import { GET_VIDEOS, REMOVE_VIDEO_SUCCESS } from "./types";
import {setAlert} from './alert'
import axios from "axios";

export const getVideos = () => async dispach => {
  try {
    const videos = await axios.get("http://localhost:8080/api/videos");

    dispach({
      type: GET_VIDEOS,
      payload: { videos: videos.data }
    });

  } catch (error) {
    console.log(error);
  }
};

export const removeVideo = (id)=> async dispach =>{
  try {
    const video = await axios.delete(`http://localhost:8080/api/videos/${id}`)
    console.log(`http://localhost:8080/api/videos/${id}`)
    console.log(video.data)
    dispach({
      type:REMOVE_VIDEO_SUCCESS,
      payload: id
    })
    dispach(setAlert('Item deleted', 'success'))
  } catch (error) {
    console.log(error)
  }
};

export const saveVideo = (data)=> async dispach =>{
  console.log(data)
 
  let formData = new FormData();
  for ( var key in data ) {
    formData.append(key, data[key]);
};

  const videos = await axios.post("http://localhost:8080/api/videos",formData );
  console.log(videos)

}



