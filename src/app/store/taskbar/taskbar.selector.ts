import { createSelector } from "@ngrx/store";
import { TaskBarState } from './taskbar.reducer'

export interface TaskBarFeature { taskbar: TaskBarState }

export const noOfProductsInCart = createSelector(
    (state: TaskBarFeature) => state,
    (state: TaskBarFeature) => state.taskbar.noOfCartProducts
);

export const noOfProductsInWishList = createSelector(
    (state: TaskBarFeature) => state,
    (state: TaskBarFeature) => state.taskbar.noOfWishListProducts
);

export const noOfProductsInCartUpdated = createSelector(
    (state: TaskBarFeature) => state,
    (state: TaskBarFeature) => state.taskbar.isCartUpdated
);

export const noOfProductsInWishListUpdated = createSelector(
    (state: TaskBarFeature) => state,
    (state: TaskBarFeature) => state.taskbar.isWishListUpdated
);