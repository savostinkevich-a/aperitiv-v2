export const AUTH = 'AUTH'
export const SET_ERRORS = 'SET_ERRORS'

export interface AuthState {
    isAuthenticated: boolean
    errors: Array<string> | null
}

interface AuthAction {
    type: typeof AUTH
    isAuthenticated: boolean
}

interface SetErrorsAction {
    type: typeof SET_ERRORS
    errors: Array<string> | null
}

export type AuthActionTypes = AuthAction | SetErrorsAction