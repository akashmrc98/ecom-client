import { Product } from '@model/product.model';
import { createReducer, on, Action } from '@ngrx/store';
import { addProduct, removeProduct, clearWishList, wishListProducts } from './wishlist.actions';

export const key = "wishlist"

export interface WishListState {
    products: Product[],
    isLoaded: boolean
}

export const initialState: WishListState = {
    products: [],
    isLoaded: false
};

export const _wishListReducer = createReducer(
    initialState,
    on
        (addProduct,
            (state, { product }) => ({
                ...state,
                products: [...state.products, product],
            })
        ),
    on
        (removeProduct,
            (state, { index }) => ({
                ...state,
                products:
                    [
                        ...state.products.slice(0, index),
                        ...state.products.slice(index + 1),
                    ]
            })
        ),
    on
        (wishListProducts,
            (state, { products }) => ({
                ...state,
                products: products,
                isLoaded: true
            })
        ),
    on
        (clearWishList,
            (state) => ({
                ...state,
                products: [],
            })
        ),
);

export function wishListReducer(state: WishListState, action: Action) {
    return _wishListReducer(state, action)
}