// src/config/api.config.ts

export const API = {
  // URL de base
  BASE_URL: "http://195.26.248.163:8181/api/v1",

  // Authentification
  AUTH: {
    LOGIN: "/auth/authenticate",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh-token",
    VERIFY_TOKEN: "/auth/verify-token",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_OTP: "/auth/request-new-otp",
  },

  // Utilisateurs
  USERS: {
    BASE: "/users",
    GET_BY_ID: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    CHANGE_PASSWORD: "/users/change-password",
  },

  // Produits
  PRODUCTS: {
    BASE: "/products",
    GET_BY_ID: (id: string) => `/products/${id}`,
    CREATE: "/products",
    UPDATE: (id: string) => `/products/${id}`,
    DELETE: (id: string) => `/products/${id}`,
    SEARCH: "/products/search",
    BY_CATEGORY: (categoryId: string) => `/products/category/${categoryId}`,
    TOP_PRODUCTS: "/products/top",
    NEW_PRODUCTS: "/products/new",
  },

  // Catégories
  CATEGORIES: {
    BASE: "/categorie-produits",
    GET_BY_ID: (id: string) => `/categorie-produits/${id}`,
    CREATE: "/categorie-produits",
    UPDATE: (id: string) => `/categorie-produits/${id}`,
    DELETE: (id: string) => `/categorie-produits/${id}`,
    TOP_CATEGORIES: "/categorie-produits/top",
  },

  // Boutiques
  SHOPS: {
    BASE: "/shops",
    GET_BY_ID: (id: string) => `/shops/${id}`,
    CREATE: "/shops",
    UPDATE: (id: string) => `/shops/${id}`,
    DELETE: (id: string) => `/shops/${id}`,
    BY_USER: (userId: string) => `/shops/user/${userId}`,
  },

  // Commandes
  ORDERS: {
    BASE: "/orders",
    GET_BY_ID: (id: string) => `/orders/${id}`,
    CREATE: "/orders",
    UPDATE: (id: string) => `/orders/${id}`,
    DELETE: (id: string) => `/orders/${id}`,
    USER_ORDERS: "/orders/user",
    SHOP_ORDERS: "/orders/shop",
  },

  // Panier
  CART: {
    GET: "/cart",
    ADD_ITEM: "/cart/add",
    REMOVE_ITEM: "/cart/remove",
    UPDATE_QUANTITY: "/cart/update-quantity",
    CLEAR: "/cart/clear",
  },

  // Favoris
  FAVORITES: {
    BASE: "/favorites",
    ADD: "/favorites/add",
    REMOVE: "/favorites/remove",
    USER_FAVORITES: "/favorites/user",
  },

  // Paiements
  PAYMENTS: {
    INITIATE: "/payments/initiate",
    VERIFY: "/payments/verify",
    HISTORY: "/payments/history",
  },

  // Événements
  EVENTS: {
    BASE: "/events",
    GET_BY_ID: (id: string) => `/events/${id}`,
    CREATE: "/events",
    UPDATE: (id: string) => `/events/${id}`,
    DELETE: (id: string) => `/events/${id}`,
  },

  // Reviews
  REVIEWS: {
    BASE: "/reviews",
    GET_BY_ID: (id: string) => `/reviews/${id}`,
    CREATE: "/reviews",
    UPDATE: (id: string) => `/reviews/${id}`,
    DELETE: (id: string) => `/reviews/${id}`,
    PRODUCT_REVIEWS: (productId: string) => `/reviews/product/${productId}`,
  },
};
