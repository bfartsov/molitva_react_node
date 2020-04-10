import { GET_BANNERS } from "../actions/types";

const initialState = {
  banners: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_BANNERS:
      return {
        ...state,
        banners: payload,
        payload,
        loading: false,
      };
    default:
      return state;
  }
}
