import {
    ConnectActionType,
    ConnectsState,
    GET_CONNECT,
    GET_CONNECTS,
    GET_TOTAL_COUNT,
    SET_ERRORS,
    SET_MODAL_OPEN
} from "./types";

const initialState: ConnectsState = {
    connects: [],
    total: 0,
    currentConnect: {
        _id: '',
        name: '',
        desire: '',
        phone: '',
        isConnected: false,
        isSold: false,
        isViewed: false
    },
    errors: null,
    isModalOpen: false
}

export const connectReducer = (state = initialState, action: ConnectActionType): ConnectsState => {
    switch (action.type){
        case GET_CONNECTS: {
            return {
                ...state,
                connects: action.connects
            }
        }
        case GET_TOTAL_COUNT: {
            return {
                ...state,
                total: action.total
            }
        }
        case GET_CONNECT: {
            return {
                ...state,
                currentConnect: action.currentConnect
            }
        }
        case SET_ERRORS: {
            return {
                ...state,
                errors: action.errors
            }
        }
        case SET_MODAL_OPEN: {
            return {
                ...state,
                isModalOpen: action.isModalOpen
            }
        }
        default: {
            return state
        }
    }
}