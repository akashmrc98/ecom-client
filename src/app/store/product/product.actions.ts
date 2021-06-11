import { ProductList } from '@model/domain/ProductList.model';
import { createAction, props } from '@ngrx/store';

export const products = createAction(
    '[Product] Products',
    props<{ products: ProductList[] }>()
);

export const addProduct = createAction(
    '[Product] Add Product',
    props<{ product: ProductList }>()
);