const API_URL = import.meta.env.VITE_API_URL;

// auth
export const REGISTER_API_URL = API_URL + "auth/register";
export const LOGIN_API_URL = API_URL + "auth/login";

// cats
export const CATS_API_URL = API_URL + "cats";
export const FAVORITES_API_URL = API_URL + "favorites";
export const FAVORITES_ADD_API_URL = API_URL + "favorites/add";
export const FAVORITES_REMOVE_API_URL = API_URL + "favorites/remove";
