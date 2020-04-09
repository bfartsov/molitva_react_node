import { GET_PRAYERS, REMOVE_PRAYER_SUCCESS } from "../actions/types";

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
    case REMOVE_PRAYER_SUCCESS:
      return {
        ...state,
        prayers: state.prayers.filter((item) => item._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
}
