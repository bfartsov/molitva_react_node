import { GET_PRAYERS } from "../actions/types";

const initialState = {
  prayers: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRAYERS:
      return {
        ...state,
        prayers: payload,
        loading: false,
      };
    default:
      return state;
  }
}
