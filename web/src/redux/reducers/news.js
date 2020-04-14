import { GET_HOMEPAGE_NEWS } from "../actions/types";

const initialState = {
  homePageNews: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_HOMEPAGE_NEWS:
      return {
        ...state,
        homePageNews: payload,
        loading: false,
      };
    default:
      return state;
  }
}
