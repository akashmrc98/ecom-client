import { Address } from "@model/domain/address.model";

export interface PurchaseDTO {
    cartId: number;
    username: string;
    totalPrice: number;
    totalProducts: number;
    productsQuantityList: number[];
    productsIdList: number[];
    paymentMethod: string;
    address: Address;
}