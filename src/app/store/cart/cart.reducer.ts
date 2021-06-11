import { ProductList } from '@model/domain/ProductList.model';
import { createReducer, on, Action } from '@ngrx/store';
import { addProduct, cartProducts, clearCart, removeProduct } from './cart.actions';

export const key = "cart"

export interface CartState {
    products: ProductList[],
    isLoaded: boolean
}

export const initialState: CartState = {
    products: [],
    isLoaded: false
};

export const _cartReducer = createReducer(
    initialState,
    on
        (addProduct,
            (state, { product }) => ({
                ...state,
                products: [...state.products, product]
            })
        ),
    on
        (removeProduct,
            (state, { index }) => ({
                ...state,
                products: [
                    ...state.products.slice(0, index),
                    ...state.products.slice(index + 1),
                ]
            })
        ),
    on
        (cartProducts,
            (state, { products }) => ({
                ...state,
                products: products,
                isLoaded: true
            })
        ),
    on
        (clearCart,
            (state) => ({
                ...state,
                products: [],
            })
        ),
);

export function cartReducer(state: CartState, action: Action) {
    return _cartReducer(state, action)
}