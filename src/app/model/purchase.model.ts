import { Address } from "./address.model";
import { Product } from "./product.model";

export interface Purchase {
    cartId: number;
    username: string;
    totalPrice: number;
    totalProducts: number;
    productsQuantityList: number[];
    productsIdList: number[];
    products: Product[];
    paymentMethod: string;
    address: Address;
}

export interface Purchases {
    id: number,
    totalProducts: number,
    totalPrice: number,
    purchasedAt: Date,
    lastModifiedAt: Date,
    products: Product[],
    productsQuantityList: number[],
    paymentMethod: string,
    address: Address
}