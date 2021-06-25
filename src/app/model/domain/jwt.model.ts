export interface JwtResponse {
    id: number,
    userId: number,
    username: string,
    accessToken: string,
    refreshToken: string
}