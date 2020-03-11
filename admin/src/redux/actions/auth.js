import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../../utils/setAuthToken";
import {
  REGISTER_FAIL,
  REGSTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";

//LOAD user
export const loadUser = () => async dispach => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:8080/api/auth/login");
    dispach({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    dispach({
      type: AUTH_ERROR
    });
  }
};

export const register = (name, email, password) => async dispach => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios("/appi/", body, config);
    dispach({
      type: REGSTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispach(setAlert(error.msg));
      });
    }
    dispach({ type: REGISTER_FAIL });
  }
};

export const login = (email, password) => async dispach => {
  const body = JSON.stringify({ email, password });
  try {
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json"
      }
    });
    const token = await response.json();
    console.log(token);
    if (token.error) {
      console.log(token.error);
      dispach(setAlert("Invalid credential", "danger"));
      return dispach({ type: LOGIN_FAIL });
    }
    dispach({
      type: LOGIN_SUCCESS,
      payload: token
    });
    dispach(loadUser());
  } catch (err) {
    console.log(err);
    if (err) {
      err.forEach(error => {
        setAlert("Invalid credential", "danger");
      });
    }
    dispach({ type: LOGIN_FAIL });
  }
};

export const logout = () => dispach => {
  dispach({
    type: LOGOUT
  });
};
