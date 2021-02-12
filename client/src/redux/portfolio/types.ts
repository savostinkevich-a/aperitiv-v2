export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCT = 'GET_PRODUCT'
export const GET_TOTAL_COUNT = 'GET_TOTAL_COUNT'
export const SET_ERRORS = 'SET_ERRORS'

export interface Product {
    _id: string
    prettyId: string
    title: string
    price: number
    description: string
    imageUrls: Array<string>
}


export interface CreateProductData {
    title: string
    category: string
    imageUrl: string
    prettyId: string
}

export interface PortfolioState {
    products: Product[]
    isFetching: boolean
    currentProduct: Product
    total: number
    errors: Array<string> | null
}

interface GetProductsAction {
    type: typeof GET_PRODUCTS
    products: Product[]
}

interface GetProductAction {
    type: typeof GET_PRODUCT
    product: Product
}

interface GetTotalCount {
    type: typeof GET_TOTAL_COUNT
    total: number
}

interface setErrorsAction {
    type: typeof SET_ERRORS
    errors: Array<string> | null
}


export type PortfolioActionTypes = GetProductsAction | GetTotalCount | setErrorsAction | GetProductAction
