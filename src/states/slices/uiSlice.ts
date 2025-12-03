import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  toastMessage: string;
}

const initialState: UIState = {
  toastMessage: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    clearToast: (state) => {
      state.toastMessage = '';
    },
  },
});

export const { setToast, clearToast } = uiSlice.actions;
export default uiSlice.reducer;
