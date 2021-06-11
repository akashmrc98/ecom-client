import { Address } from "./address.model";
import { ProductList } from "./ProductList.model";

export interface Purchases {
    id: number,
    totalProducts: number,
    totalPrice: number,
    purchasedAt: Date,
    productsQuantityList: number[],
    products: ProductList[],
    paymentMethod: string,
    address: Address
}