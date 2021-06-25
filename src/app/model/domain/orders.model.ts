import { Address } from "./address.model";
import { ProductList } from "./ProductList.model";

export interface Orders {
    id: number,
    totalProducts: number,
    totalPrice: number,
    purchasedAt: Date,
    productsQuantityList: number[],
    isProductsReviewed:boolean[],
    products: ProductList[],
    paymentMethod: string,
    address: Address
}