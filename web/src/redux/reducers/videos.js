import { GET_HOMEPAGE_VIDEOS } from "../actions/types";

const initialState = {
  HomePageVideos: [],
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
    default:
      return state;
  }
}
