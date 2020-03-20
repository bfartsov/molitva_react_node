import { EDIT } from "../actions/types";
const initialState = {
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case EDIT:
      return { ...state, ...payload, loading: false };

    default:
      return state;
  }
}
