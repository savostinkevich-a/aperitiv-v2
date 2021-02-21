import {ThunkAction} from "redux-thunk";
import {RootState} from "../redux-store";
import {Action} from "redux";
import client from "../../graphql/graphql";
import {gql} from "@apollo/client";
import {getProduct, getProducts, getTotalCount, setErrors} from "./actions";
import {CreateProductData} from "./types";

export const getProductsThunk = (
    limit: number, page: number, filters: any): ThunkAction<void, RootState, unknown, Action<string>> =>
async dispatch => {
    const {data, errors} = await client.query({
        errorPolicy: 'all',
        variables: {
            limit,
            page,
            filters
        },
        query: gql`
            query GetProducts($limit: Int!, $page: Int!, $filters: FilterProductsInput) {
                getProducts(limit: $limit, page: $page, filters: $filters) {
                    products {
                        title
                        price
                        description
                        _id
                        prettyId
                        imageUrls   
                    }
                    total
                }
            }
        `
    })
    if (data) {
        dispatch(getProducts(data.getProducts.products))
        dispatch(getTotalCount(data.getProducts.total))
        dispatch(setErrors(null))
    }
    if (errors) {
        dispatch(setErrors(errors.map(item => item.message)))
    }

}

export const getProductThunk = (prettyId: string): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    const {data, errors} = await client.query({
        errorPolicy: 'all',
        variables: {
            prettyId
        },
        query: gql`
            query GetCurrentProduct($prettyId: String!) {
                getProductByPrettyId(prettyId: $prettyId) {
                    title
                    price
                    description
                    _id
                    prettyId
                    imageUrls
                }
            }
        `
    })
    if (data) {
        dispatch(getProduct(data.getProductByPrettyId))
        dispatch(setErrors(null))
    }
    if (errors) {
        dispatch(setErrors(errors.map(item => item.message)))
    }
}


export const createProductThunk = (createProductD: CreateProductData): ThunkAction<void, RootState, unknown, Action<string>> =>
async dispatch => {
    const {data, errors} = await client.mutate({
        errorPolicy: 'all',
        variables: {
            title: createProductD.title,
            category: createProductD.category,
            prettyId: createProductD.prettyId,
            imageUrl: createProductD.imageUrl
        },
        mutation: gql`
            mutation CreateProduct($title: String!, $price: Float!, $description: String!, $imageUrl: [String!]!) {
                createProduct(createProductData: {
                    title: $title,
                    price: $price,
                    description: $description,
                    imageUrls: $imageUrl
                }) {
                    title
                }
            }
        `
    })
    if (data) {
        dispatch(setErrors(null))
    }
    if (errors) {
        dispatch(setErrors(errors.map(item => item.message)))
    }
}