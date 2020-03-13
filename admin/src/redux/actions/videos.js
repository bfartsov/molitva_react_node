import { GET_VIDEOS } from "./types";
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
