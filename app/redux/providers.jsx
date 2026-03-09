"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "../context/contextthem";



export default function Providers({ children }) {
    return (
        <Provider store={store}>


            <ThemeProvider>




                {children}
            </ThemeProvider>

        </Provider>
    );
}
