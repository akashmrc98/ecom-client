import { createSelector } from "@ngrx/store";
import { CartState } from './cart.reducer'

export interface CartFeature { cart: CartState }

export const products = createSelector(
    (state: CartFeature) => state,
    (state: CartFeature) => state.cart.products
);

export const isLoaded = createSelector(
    (state: CartFeature) => state,
    (state: CartFeature) => state.cart.isLoaded
);