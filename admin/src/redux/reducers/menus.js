import { GET_MENUS_FRONT} from "../actions/types";

const initialState = {
  menus: [],
  loading: true
};

export default function(state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_MENUS_FRONT:
      return {
        ...state,
        menus: payload.menus,

        loading: false
      };
    // case REMOVE_VIDEO_SUCCESS:
    //   return{
    //     ...state,
    //     videos: state.videos.filter(video=>video._id!==payload),
    //     loading: false
    //   } 
    default:
      return state;
  }
}
