export const GET_CONNECTS = "GET_CONNECTS"
export const GET_CONNECT = "GET_CONNECT"
export const GET_TOTAL_COUNT = 'GET_TOTAL_COUNT'
export const SET_ERRORS = 'SET_ERRORS'
export const SET_MODAL_OPEN = 'SET_MODAL_OPEN'

export interface Connect {
    _id: string
    desire: string
    date: string
    isViewed: boolean
    isConnected: boolean
    isSold: boolean
}

export interface CreateConnectData {
    name: string
    desire: string
    phone: string
}

export interface ConnectFull {
    _id: string
    name: string
    desire: string
    phone: string
    isViewed: boolean
    isConnected: boolean
    isSold: boolean
}

export interface ConnectsState {
    connects: Connect[]
    currentConnect: ConnectFull
    total: number
    errors: Array<string> | null
    isModalOpen: boolean
}

interface GetConnectsAction {
    type: typeof GET_CONNECTS
    connects: Connect[]
}

interface GetTotalCount {
    type: typeof GET_TOTAL_COUNT
    total: number
}

interface GetConnectAction {
    type: typeof GET_CONNECT
    currentConnect: ConnectFull
}

interface SetErrorsAction {
    type: typeof SET_ERRORS
    errors: Array<string> | null
}

interface SetModalOpenAction {
    type: typeof SET_MODAL_OPEN
    isModalOpen: boolean
}

export type ConnectActionType = GetConnectsAction | GetConnectAction | GetTotalCount | SetErrorsAction | SetModalOpenAction