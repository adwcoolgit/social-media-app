import { AuthDialog } from '@/states/slices/uiSlice';
import { createContext } from 'react';

export type AuthDialogType = {
  dialog: AuthDialog;
  setDialog: (value: AuthDialog) => void;
};

export const AuthContext = createContext<AuthDialogType>({
  dialog: undefined,
  setDialog: () => {},
});
