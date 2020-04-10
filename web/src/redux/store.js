import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducers from "./reducers/rootReducer";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(...middleware)
);

export default store;
