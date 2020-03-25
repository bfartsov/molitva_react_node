import { SAVE } from "../actions/types";
const initialState = {
  items: '',
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SAVE:
      return { ...state, items: payload, loading: false };
    default:
      return state;
  }
}
