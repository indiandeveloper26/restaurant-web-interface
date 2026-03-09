




import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedIn: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        },
        logout: (state) => {
            console.log('logut rining')
            state.user = null;
            state.isLoggedIn = false;
            if (typeof window !== "undefined") {
                localStorage.removeItem("user");
            }
        },
        setUserFromStorage: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = !!action.payload;
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            if (typeof window !== "undefined") {
                localStorage.setItem("user", JSON.stringify(state.user));
            }
        },
    },
});

export const { login, logout, setUserFromStorage, updateUser } = userSlice.actions;
export default userSlice.reducer;
