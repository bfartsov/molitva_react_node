import { GET_MENUS_FRONT} from "./types";
import {setAlert} from './alert'
import axios from "axios";

export const getFrontMenus = () => async dispach => {
  try {
    const menus = await axios.get("http://localhost:8080/api/menus");

    dispach({
      type: GET_MENUS_FRONT,
      payload: { menus: menus.data }
    });

  } catch (error) {
    console.log(error);
  }
};

// export const removeVideo = (id)=> async dispach =>{
//   try {
//     const video = await axios.delete(`http://localhost:8080/api/videos/${id}`)
//     console.log(`http://localhost:8080/api/videos/${id}`)
//     console.log(video.data)
//     dispach({
//       type:REMOVE_VIDEO_SUCCESS,
//       payload: id
//     })
//     dispach(setAlert('Item deleted', 'success'))
//   } catch (error) {
//     console.log(error)
//   }
// }
