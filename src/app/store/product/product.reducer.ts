import { ProductList } from '@model/domain/ProductList.model';
import { createReducer, on, Action } from '@ngrx/store';
import { addProduct, products } from './product.actions';

export const key = "product"

export interface ProductState {
    products: ProductList[],
    isLoaded: boolean
}

export const initialState: ProductState = {
    products: [],
    isLoaded: false
};

export const _productReducer = createReducer(
    initialState,
    on
        (addProduct,
            (state, { product }) => ({
                ...state,
                products: [...state.products, product]
            })
        ),
    on
        (products,
            (state, { products }) => ({
                ...state,
                products: products,
                isLoaded: true
            })
        ),
);

export function productReducer(state: ProductState, action: Action) {
    return _productReducer(state, action)
}