import {AUTH, AuthActionTypes, AuthState, SET_ERRORS} from "./types";

const initialState: AuthState = {
    isAuthenticated: false,
    errors: null
}

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case AUTH: {
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        }
        case SET_ERRORS: {
            return {
                ...state,
                errors: action.errors
            }
        }
        default: {
            return state
        }
    }
}