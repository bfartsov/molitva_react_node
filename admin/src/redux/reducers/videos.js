import { GET_VIDEOS, REMOVE_VIDEO_SUCCESS, SAVE_VIDEO, REMOVE_VIDEO_FAIL } from "../actions/types";

const initialState = {
  videos: [],
  loading: true
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_VIDEOS:
    case SAVE_VIDEO:
      return {
        ...state,
        videos: payload.videos,
        loading: false
      };
    case REMOVE_VIDEO_SUCCESS:
      return {
        ...state,
        videos: state.videos.filter(video => video._id !== payload),
        loading: false
      }
    default:
      return state;
  }
}
