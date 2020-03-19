import { GET_NEWS, REMOVE_NEWS_SUCCESS } from "../actions/types";

const initialState = {
  news: [],
  loading: true
};

export default function(state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_NEWS:
      return {
        ...state,
        news: payload.news,

        loading: false
      };
    case REMOVE_NEWS_SUCCESS:
      return{
        ...state,
        news: state.news.filter(item=>item._id!==payload),
        loading: false
      } 
    default:
      return state;
  }
}
