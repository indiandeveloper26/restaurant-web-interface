import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slice";
import authReducer from "./authslice";
import productsReducer from "./producttahnk";

export const store = configureStore({
    reducer: {
        app: appReducer,
        auth: authReducer,
        products: productsReducer,

    },
});
