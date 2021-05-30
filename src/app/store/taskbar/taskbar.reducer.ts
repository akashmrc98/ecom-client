import { createReducer, on, Action } from '@ngrx/store';
import { clearCart, clearWishList, noOfProductsInCart, noOfProductsInWishList } from './taskbar.actions';

export const key = "taskbar"
export interface TaskBarState {
    noOfWishListProducts: number,
    isCartUpdated: boolean,
    noOfCartProducts: number,
    isWishListUpdated: boolean
}

export const initialState: TaskBarState = {
    noOfCartProducts: 0,
    isCartUpdated: false,
    noOfWishListProducts: 0,
    isWishListUpdated: false
};

export const _taskbarReducer = createReducer(
    initialState,
    on
        (noOfProductsInCart,
            (state, { noOfCartProducts }) => ({
                ...state,
                noOfCartProducts: noOfCartProducts,
                isCartUpdated: true
            })
        ),
    on
        (noOfProductsInWishList,
            (state, { noOfWishListProducts }) => ({
                ...state,
                noOfWishListProducts: noOfWishListProducts,
                isWishListUpdated: true
            })
        ),
    on
        (clearCart,
            (state) => ({
                ...state,
                noOfCartProducts: 0
            })
        ),
    on
        (clearWishList,
            (state) => ({
                ...state,
                noOfWishListProducts: 0
            })
        )

);

export function taskBarReducer(state: TaskBarState, action: Action) {
    return _taskbarReducer(state, action)
}