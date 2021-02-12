import {GET_PRODUCT, GET_PRODUCTS, GET_TOTAL_COUNT, PortfolioActionTypes, Product, SET_ERRORS} from "./types";

export const getProducts = (products: Product[]): PortfolioActionTypes => {
    return {
        type: GET_PRODUCTS,
        products
    }
}

export const getProduct = (product: Product): PortfolioActionTypes => {
    return {
        type: GET_PRODUCT,
        product
    }
}

export const getTotalCount = (total: number): PortfolioActionTypes => {
    return {
        type: GET_TOTAL_COUNT,
        total
    }
}

export const setErrors = (errors: Array<string> | null): PortfolioActionTypes => {
    return {
        type: SET_ERRORS,
        errors
    }
}