import { Review } from "./domain/review.model";
import { Image } from "./image.model";

export interface Product {
    id?: number
    manufacturedOn: Date
    createdAt?: Date
    modifiedAt?: Date
    subCategory?: string
    description: string
    brand: string
    price: number,
    category: string
    stock: number
    specifications: string[]
    images: Image[],
    reviews?: Review[]
}

