import * as types from "./actiontypes"
import axios from "axios";

export const getRegistration = (data) => (dispatch) => {
    dispatch({ type: types.REGISTRATION_REQUEST })
    return axios.post("http://localhost:8050/mini/register", data)
        .then((res) => {
            console.log(res)
            dispatch({ type: types.REGISTRATION_SUCCESS, payload: res.data.success })
        }).catch((err) => {
            dispatch({ type: types.REGISTRATION_FAILURE })
        })
}


export const getLogin = (data) => (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST })
    return axios.post("http://localhost:8050/mini/login", data)
        .then((res) => {
            console.log(res)
            dispatch({ type: types.LOGIN_SUCCESS, payload: res.data })
        }).catch((err) => {
            dispatch({ type: types.LOGIN_FAILURE })
        })
}

