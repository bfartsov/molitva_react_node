import { GET_MENUS } from "../actions/types";

const inisialState = {
  menus: [],
  loading: true,
};

export default function (state = inisialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MENUS:
      return {
        ...state,
        menus: payload,
        loading: false,
      };
    default:
      return state;
  }
}
