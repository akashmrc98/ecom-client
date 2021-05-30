let api: string = "";
let network: string = "";
let server: string = "local-dev"

if (server === "local-dev") {
    api = "http://192.168.0.6:8080/api/v1/ecommerce"
    network = "http://192.168.0.6:8080"
}

if (server === "docker-dev") {
    api = "http://localhost:8081/api/v1/ecommerce"
    network = "http://localhost:8081"
}

export const API = api
export const NETWORK = network

export const USER_API = API + "/users/"
export const PRODUCT_API = API + "/products"
export const CART_API = API + "/carts"
export const WISHLIST_API = API + "/wishlists"
export const REVIEW_API = API + "/reviews"

export const username = localStorage.getItem("username")
export const cartId = Number(localStorage.getItem("cartId"))
export const wishListId = Number(localStorage.getItem("wishListId"))