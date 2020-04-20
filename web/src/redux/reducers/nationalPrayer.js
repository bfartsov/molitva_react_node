import { GET_NATIONAL_PRAYER } from "../actions/types";

const initialState = {
  prayer: {},
  loading: true,
};
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_NATIONAL_PRAYER:
      return {
        ...state,
        prayer: payload,
        loading: false,
      };
    default:
      return state;
  }
}
