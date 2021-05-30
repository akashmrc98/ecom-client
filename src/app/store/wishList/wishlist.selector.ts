import { createSelector } from "@ngrx/store";
import { WishListState } from './wishlist.reducer'

export interface WishListFeature { wishlist: WishListState }

export const products = createSelector(
    (state: WishListFeature) => state,
    (state: WishListFeature) => state.wishlist.products
);

export const isLoaded = createSelector(
    (state: WishListFeature) => state,
    (state: WishListFeature) => state.wishlist.isLoaded
);