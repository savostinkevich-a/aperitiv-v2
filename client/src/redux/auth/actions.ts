import {AUTH, AuthActionTypes, SET_ERRORS} from "./types";

export const auth = (isAuthenticated: boolean): AuthActionTypes => {
    return {
        type: AUTH,
        isAuthenticated
    }
}

export const setErrors = (errors: Array<string> | null): AuthActionTypes => {
    return  {
        type: SET_ERRORS,
        errors
    }
}