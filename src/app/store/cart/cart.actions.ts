import { Product } from '@model/product.model';
import { createAction, props } from '@ngrx/store';

export const cartProducts = createAction(
    '[Cart] Cart Products',
    props<{ products: Product[] }>()
);

export const addProduct = createAction(
    '[Cart] Add Product',
    props<{ product: Product }>()
);

export const removeProduct = createAction(
    '[Cart] Remove Product',
    props<{ index: number }>()
);

export const clearCart = createAction(
    '[Cart] Clear Cart'
)