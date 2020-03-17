import { GET_EVENTS, REMOVE_EVENT_SUCCESS } from "../actions/types";

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
      case REMOVE_EVENT_SUCCESS:
      return{
        ...state,
        events: state.events.filter(event=>event._id!==payload),
        loading: false
      } 
    
    default:
      return state;
  }
}
