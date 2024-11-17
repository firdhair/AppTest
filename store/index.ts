import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { pixabayApi } from '../api/pixabayApi';
import bookmarkReducer from './slices/bookmarkSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmarks: bookmarkReducer,
    [pixabayApi.reducerPath]: pixabayApi.reducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pixabayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
