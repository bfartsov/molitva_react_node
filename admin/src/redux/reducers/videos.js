import { GET_VIDEOS } from "../actions/types";

const initialState = {
  videos: [],
  title: {},
  items: [],
  loading: true
};

export default function(state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_VIDEOS:
      return {
        ...state,
        videos: payload.videos,
        title: payload.title,
        items: payload.items,
        loading: false
      };
    default:
      return state;
  }
}
