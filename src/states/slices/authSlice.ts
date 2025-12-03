import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {} from '@reduxjs/toolkit';
interface AuthState {
  isLogin: boolean;
  isRegister: boolean;
}

const initialState: AuthState = {
  isLogin: false,
  isRegister: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    IsLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    IsRegister: (state, action: PayloadAction<boolean>) => {
      state.isRegister = action.payload;
    },
  },
});

export const { IsLogin, IsRegister } = authSlice.actions;
export default authSlice.reducer;
