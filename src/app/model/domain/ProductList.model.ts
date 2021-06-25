export interface ProductList {
    id: number
    brand: string
    price: number,
    description: string
    stock: number,
    image: Blob,
    reviews?: number,
    ratings?: number,
    quantity?:number,
    isReviewed?:boolean
}


