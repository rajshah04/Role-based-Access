import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../Redux/Slices/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice
    },
})