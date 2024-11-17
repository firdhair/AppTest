import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
//import bookmarkReducer from './slices/bookmarkSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    //bookmarks: bookmarkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
