import { ProductList } from '@model/domain/ProductList.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as Q from 'q';
import { addProduct, cartProducts, clearCart, removeProduct, updateProductQuantity } from './cart.actions';

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


function updateProductQunatity (products:ProductList[], productId:number, quantity:number) :ProductList[] {
        let updateProductList :ProductList[] = products;
         updateProductList.map(product=>{
                if(product.id === productId) product.stock === quantity
        })
        return updateProductList;
}

export function cartReducer(state: CartState, action: Action) {
    return _cartReducer(state, action)
}