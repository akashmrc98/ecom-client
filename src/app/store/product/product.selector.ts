import { createSelector } from "@ngrx/store";
import { ProductState } from './product.reducer'

export interface ProductFeature { product: ProductState }

export const products = createSelector(
    (state: ProductFeature) => state,
    (state: ProductFeature) => state.product.products
);

export const isLoaded = createSelector(
    (state: ProductFeature) => state,
    (state: ProductFeature) => state.product.isLoaded
);