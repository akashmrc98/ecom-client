export interface Review {
    productId?: number,
    reviewId: number,
    username: string,
    headLine: string,
    description: string
    rating: number,
    reviewedOn: Date,
    favourites: number[],
    isReviewed: boolean,
}