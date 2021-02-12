import {
    GET_PRODUCT,
    GET_PRODUCTS,
    GET_TOTAL_COUNT,
    PortfolioActionTypes,
    PortfolioState,
    SET_ERRORS
} from "./types";

const initialState: PortfolioState = {
    products: [],
    isFetching: false,
    total: 0,
    errors: null,
    currentProduct: {
        _id: '',
        prettyId: '',
        title: '',
        price: 0,
        description: 'Такой страницы у нас нет(',
        imageUrls: ['http://localhost:5000/cat.jpg']
    }
}

export const portfolioReducer = (state = initialState, action: PortfolioActionTypes): PortfolioState => {
    switch (action.type){
        case GET_PRODUCTS: {
            return {
                ...state,
                products: action.products
            }
        }
        case GET_PRODUCT: {
            return {
                ...state,
                currentProduct: action.product
            }
        }
        case GET_TOTAL_COUNT: {
            return {
                ...state,
                total: action.total
            }
        }
        case SET_ERRORS: {
            return {
                ...state,
                errors: action.errors
            }
        }
        default:
            return state
    }
}