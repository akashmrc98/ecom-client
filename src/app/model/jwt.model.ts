export interface JwtResponse {
    id: number,
    cartId: number,
    wishListId: number,
    username: string,
    accessToken: string,
    refreshToken: string
}