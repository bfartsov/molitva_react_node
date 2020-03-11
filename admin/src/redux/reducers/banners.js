import { GET_BANNERS } from "../actions/types";

const initialState = {
  banners: [],
  title: {},
  items: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BANNERS:
      return {
        ...state,
        banners: payload.banners,
        title: payload.title,
        items: payload.items,
        loading: false
      };
    default:
      return state;
  }
}
