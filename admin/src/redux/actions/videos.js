import { GET_VIDEOS } from "./types";
import axios from "axios";

export const getVideos = () => async dispach => {
  try {
    const videos = await axios.get("http://localhost:8080/api/videos");
    let title = {};
    let items = [];
    if (videos.data.length > 0) {
      videos.data.forEach(video => {
        const item = {
          id: video._id,
          title: video.title,
          description: video.description,
          img: video.img,
          video: video.video,
          date: video.date,
          feature: video.feature
        };
        items.push(item);
      });
    }
    items.length > 0 ? (title = Object.keys(items[0])) : (title = {});
    dispach({
      type: GET_VIDEOS,
      payload: { videos: videos.data, title, items }
    });
  } catch (error) {
    console.log(error);
  }
};
