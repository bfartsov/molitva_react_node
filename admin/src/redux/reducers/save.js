import { SAVE } from "../actions/types";
const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE:
      return { ...state, payload };
    default:
      return state;
  }
}
