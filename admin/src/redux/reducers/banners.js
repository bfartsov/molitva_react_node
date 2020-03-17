import { GET_BANNERS, REMOVE_BANNER_SUCCESS, REMOVE_BANNER_FAIL } from "../actions/types";

const initialState = {
  banners: [],
 
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BANNERS:
      return {
        ...state,
        banners: payload.banners,
        loading: false
      };
      case REMOVE_BANNER_SUCCESS:
      return {
        ...state,
        banners: state.banners.filter(banner=>banner._id !== payload),
        loading: false
      };
    default:
      return state;
  }
}
