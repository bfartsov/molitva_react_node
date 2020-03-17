import { GET_EVENTS } from "../actions/types";

const initialState = {
  events: [],
  loading: true
};

export default function(state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload.events,
        loading: false
      };
    
    default:
      return state;
  }
}
