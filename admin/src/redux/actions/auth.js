import axios from 'axios';
import {setAlert} from './alert'
import setAuthToken from '../../utils/setAuthToken';
import { REGISTER_FAIL, REGSTER_SUCCESS, USER_LOADED, AUTH_ERROR } from './types';


//LOAD user
export const loadUser = ()=> async dispach=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('http://localhost:8080/api/auth/login');
        dispach({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        dispach({
            type: AUTH_ERROR
        });
    }
}


export const register = ({ name, email, password }) => async dispach => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({ name, email, password });
    try {
        const res = await axios('/appi/', body, config)
        dispach({
            type: REGSTER_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.forEach(error => {
                dispach(setAlert(error.msg))
            });
        }
        dispach({ type: REGISTER_FAIL })
    }
}
