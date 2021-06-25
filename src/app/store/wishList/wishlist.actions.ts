import { ProductList } from '@model/domain/ProductList.model';
import { createAction, props } from '@ngrx/store';

export const wishListProducts = createAction(
    '[WishList] WishList Products',
    props<{ products: ProductList[] }>()
);

export const addProduct = createAction(
    '[WishList] Add Product',
    props<{ product: ProductList }>()
);

export const removeProduct = createAction(
    '[WishList] Remove Product',
    props<{ index: number }>()
);

export const clearWishList = createAction(
    '[WishList] Clear WishList'
)