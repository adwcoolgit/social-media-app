import { configureStore } from '@reduxjs/toolkit';
import uiReducer from '../states/slices/uiSlice';
import authReducer from '../states/slices/authSlice';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
