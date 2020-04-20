import { GET_HOMEPAGE_VIDEOS, GET_VIDEOS } from "../actions/types";

const initialState = {
  HomePageVideos: [],
  videos: [],
  loading: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_HOMEPAGE_VIDEOS:
      return {
        ...state,
        HomePageVideos: payload,
        loading: false,
      };
    case GET_VIDEOS:
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    default:
      return state;
  }
}
