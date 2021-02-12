import {
    Connect,
    ConnectActionType,
    ConnectFull,
    GET_CONNECT,
    GET_CONNECTS,
    GET_TOTAL_COUNT,
    SET_ERRORS,
    SET_MODAL_OPEN
} from "./types";

export const getConnects = (connects: Connect[]): ConnectActionType => {
    return {
        type: GET_CONNECTS,
        connects
    }
}

export const getTotalCount = (total: number): ConnectActionType => {
    return {
        type: GET_TOTAL_COUNT,
        total
    }
}

export const getCurrentConnect = (currentConnect: ConnectFull): ConnectActionType => {
    return {
        type: GET_CONNECT,
        currentConnect
    }
}

export const setErrors = (errors: Array<string> | null): ConnectActionType => {
    return {
        type: SET_ERRORS,
        errors
    }
}

export const setModalOpen = (isModalOpen: boolean): ConnectActionType => {
    return {
        type: SET_MODAL_OPEN,
        isModalOpen
    }
}