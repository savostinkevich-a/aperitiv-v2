import {ThunkAction} from "redux-thunk";
import {RootState} from "../redux-store";
import {Action} from "redux";
import client from "../../graphql/graphql";
import {gql} from "@apollo/client";
import {getConnects, getCurrentConnect, getTotalCount, setErrors} from "./actions";
import {CreateConnectData} from "./types";

export const getConnectsThunk = (limit: number, page: number, filters: any): ThunkAction<void, RootState, unknown, Action<string>> =>
async dispatch => {
    const {data, errors} = await client.query({
        errorPolicy: 'all',
        variables: {
            limit,
            page,
            filters
        },
        query: gql`
            query GetConnects($limit: Int!, $page: Int!, $filters: FilterConnectsInput) {
                getConnects(limit: $limit, page: $page, filters: $filters) {
                    connects {
                        _id
                        desire
                        date
                        isViewed
                        isConnected
                        isSold
                    }
                    total
                }
            }
        `
    })
    if (data) {
        dispatch(getConnects(data.getConnects.connects))
        dispatch(getTotalCount(data.getConnects.total))
        dispatch(setErrors(null))
    }
    if (errors) {
        dispatch(setErrors(errors.map(item => item.message)))
    }

}

// export const getConnectThunk = (_id: string): ThunkAction<void, RootState, unknown, Action<string>> =>
// async dispatch => {
//     const {data, errors} = await client.query({
//         errorPolicy: 'all',
//         variables: {
//             _id
//         },
//         query: gql`
//             query GetConnect($_id: String!) {
//                 getConnect(_id: $_id) {
//                     _id
//                     name
//                     desire
//                     phone
//                     isConnected
//                     isViewed
//                     isSold
//                 }
//             }
//         `
//     })
//     if (data) {
//         dispatch(getCurrentConnect(data.getConnect))
//         dispatch(setErrors(null))
//     }
//     if (errors) {
//         dispatch(setErrors(errors.map(item => item.message)))
//     }
// }
//
// export const createConnectThunk = (createConnectData: CreateConnectData): ThunkAction<void, RootState, unknown, Action<string>> =>
// async dispatch => {
//     const {data, errors} = await client.mutate({
//         errorPolicy: 'all',
//         variables: {
//             name: createConnectData.name,
//             desire: createConnectData.desire,
//             phone: createConnectData.phone
//         },
//         mutation: gql`
//             mutation CreateConnect($name: String!, $desire: String!, $phone: String!) {
//                 createConnect(createConnectData: {phone: $phone, name: $name, desire: $desire}) {
//                     name
//                 }
//             }
//         `
//     })
//     if (data) {
//         dispatch(setErrors(null))
//     }
//     if (errors) {
//         dispatch(setErrors(errors.map(item => item.message)))
//     }
// }