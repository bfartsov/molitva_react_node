import { GET_BANNERS, REMOVE_BANNER_SUCCESS } from "./types";
import {setAlert} from './alert'

import axios from "axios";

export const getBanners = () => async dispach => {
  try {
    const banners = await axios.get("http://localhost:8080/api/banners");
   console.log('banners')
    dispach({
      type: GET_BANNERS,
      payload: { banners: banners.data, }
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeBanner = id=> async dispach=>{
  try {
    console.log('banners');
    const banner = await axios.delete(`http://localhost:8080/api/banners/${id}`);
    console.log(banner);
    dispach({
      type: REMOVE_BANNER_SUCCESS,
      payload: id
    });
    dispach(setAlert('Item deleted', 'success'))

  } catch (error) {
    console.log(error)
  }


}
