// redux/authSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeTokenInAsyncStorage = createAsyncThunk(
  'auth/storeToken',
  async (token: string) => {
    await AsyncStorage.setItem('authToken', token);
    return token;
  }
);

interface AuthState {
  token: string | null;  
}

const initialState: AuthState = {
  token: null,  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;  
    },
    clearToken: (state) => {
      state.token = null;  
    },
  },
  extraReducers: (builder) => {
    builder.addCase(storeTokenInAsyncStorage.fulfilled, (state, action) => {
      state.token = action.payload; 
    });
  },
});

export const { setToken, clearToken } = authSlice.actions;

export default authSlice.reducer;
