import {ThunkAction} from "redux-thunk";
import {RootState} from "../redux-store";
import {Action} from "redux";
import client from "../../graphql/graphql";
import {gql} from "@apollo/client";
import {auth, setErrors} from './actions'


export const logoutThunk = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    const {data, errors} = await client.mutate({
        errorPolicy: "all",
        mutation : gql`
            mutation Logout {
                logout
            }
        `
    })
    if (data) {
        dispatch(auth(false))
        dispatch(setErrors(null))
    }
    if (errors) {
        dispatch(setErrors(errors.map(item => item.message)))
    }

}
