import { GET_LIVE } from "../actions/types";

const initialState = {
  live: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LIVE:
      return {
        ...state,
        live: payload,
        loading: false,
      };
    default:
      return state;
  }
}
