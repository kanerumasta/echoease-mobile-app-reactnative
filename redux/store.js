import { configureStore } from '@reduxjs/toolkit'
import { apiReducer, apiSlice } from './services/apiSlice'
import authApiSlice from './features/authApiSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});