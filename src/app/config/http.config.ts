let api: string = "";
let network: string = "";
let server: string = "local-dev"

if (server === "local-dev") {
    api = "http://localhost:8090/api/v1"
    network = "http://localhost:8090/api/v1"
}

if (server === "docker-dev") {
    api = "http://localhost:8081/api/v1/ecommerce"
    network = "http://localhost:8081"
}

export const SESSION_API = "http://localhost:8081/api/v1/sessions"

export const API = api
export const NETWORK = network

export const USER_API = API + "/users"
export const PRODUCT_API = API + "/products"
export const CART_API = API + "/carts"
export const WISHLIST_API = API + "/wishlists"
export const ORDER_API = API + "/orders"
export const REVIEW_API = API + "/reviews"


export const username = localStorage.getItem("username")
export const userId = Number(localStorage.getItem("userId"))