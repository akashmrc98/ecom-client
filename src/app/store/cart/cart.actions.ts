import { ProductList } from '@model/domain/ProductList.model';
import { createAction, props } from '@ngrx/store';

export const cartProducts = createAction(
    '[Cart] Cart Products',
    props<{ products: ProductList[] }>()
);

export const addProduct = createAction(
    '[Cart] Add Product',
    props<{ product: ProductList }>()
);

export const removeProduct = createAction(
    '[Cart] Remove Product',
    props<{ index: number }>()
);

export const clearCart = createAction(
    '[Cart] Clear Cart'
)

export const updateProductQuantity = createAction(
    '[Cart] Update Quantity',
    props<{productId:number, qunatity:number}>()
)