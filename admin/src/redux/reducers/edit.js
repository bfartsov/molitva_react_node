import { EDIT } from "../actions/types";
const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case EDIT:
      return { ...state, ...payload };

    default:
      return state;
  }
}
