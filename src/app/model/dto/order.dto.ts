import { Address } from "@model/domain/address.model";
import { ProductList } from "@model/domain/ProductList.model";

export interface OrderDTO {
    totalPrice: number;
    totalProducts: number;
    productsQuantityList: number[];
    productIdsList: number[];
    paymentMethod: string;
    address: Address;
    products:ProductList[],
}