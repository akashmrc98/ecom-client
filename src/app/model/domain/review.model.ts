export interface Review {
    productId: number,
    id: number,
    username: string,
    headLine: string,
    description: string
    rating: number,
    reviewedOn: Date,
    useFul: number,
    isReviewed: boolean,
}