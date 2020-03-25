import { GET_TIMER } from "../actions/types";

const initialState = {
  timer: {},
  loading: true
};

export default function(state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_TIMER:
      return {
        ...state,
        timer: payload,
        loading: false
      };
    
    default:
      return state;
  }
}
