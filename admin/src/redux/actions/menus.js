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

export const addMenu = (data, history)=> async dispach =>{
  console.log(data)
 
  const res = await axios.post("http://localhost:8080/api/menus",data );

  res.status ===200 && dispach(setAlert('Updated Successfully', 'success'));
  res.status ===200 && dispach(getFrontMenus());

  res.status ===200 && history.push('/menus')

};
export const editMenu = (data, history, id, url)=> async dispach =>{
 
  try {
    console.log(data)
 
    const res = await axios.put(`http://localhost:8080/api/menus/${id}`,data );
    console.log(res)
    res.status ===200 && dispach(setAlert('Updated Successfully', 'success'));
    res.status ===200 && dispach(getFrontMenus());
  
    res.status ===200 && history.push(url);
  } catch (error) {
    console.log(error)
  }

};

