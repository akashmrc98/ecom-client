import { createAction, props } from '@ngrx/store';

export const noOfProductsInCart = createAction(
    '[TaskBar] No of Cart Products',
    props<{ noOfCartProducts: number }>()
);

export const clearCart = createAction(
    '[TaskBar] Clear Cart'
)

export const noOfProductsInWishList = createAction(
    '[TaskBar] No of WishList Products',
    props<{ noOfWishListProducts: number }>()
);

export const clearWishList = createAction(
    '[TaskBar] Clear WishList'
)