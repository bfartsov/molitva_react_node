import { GET_MENUS_FRONT, REMOVE_MENU_SUCCESS } from "../actions/types";

const initialState = {
  menus: [],
  loading: true,
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_MENUS_FRONT:
      return {
        ...state,
        menus: payload.menus,

        loading: false,
      };
    case REMOVE_MENU_SUCCESS:
      return {
        ...state,
        menus: state.menus.filter((item) => item._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
