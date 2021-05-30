import { Product } from '@model/product.model';
import { createAction, props } from '@ngrx/store';

export const wishListProducts = createAction(
    '[WishList] WishList Products',
    props<{ products: Product[] }>()
);

export const addProduct = createAction(
    '[WishList] Add Product',
    props<{ product: Product }>()
);

export const removeProduct = createAction(
    '[WishList] Remove Product',
    props<{ index: number }>()
);

export const clearWishList = createAction(
    '[WishList] Clear WishList'
)