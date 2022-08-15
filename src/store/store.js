import { configureStore } from '@reduxjs/toolkit';
import { authSlice, productoSlice } from './';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        producto: productoSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
