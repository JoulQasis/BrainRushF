import { configureStore, createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, isLoggedIn: false },
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            state.user = action.payload.user;
        },
        logout(state) {
            state.isLoggedIn = false
            state.user = null;
        },
    }
});

export const authActions = authSlice.actions;
export const store =   authSlice.reducer
