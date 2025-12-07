import { useRegister } from '@/features/auth/register.service';
import { RegisterPayload, registerSchema } from '@/schemas/register.schema';
import { setDialog } from '@/states/slices/uiSlice';
import { RootState } from '@/states/store';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useRegisterAction = () => {
  const dispatch = useDispatch();
  const authDialog = useSelector((state: RootState) => state.ui.authDialog);
  const {
    mutateAsync: loginMutate,
    isPending,
    isSuccess,
    ...props
  } = useRegister();

  // Gunakan useCallback , mencegah submitForm dibuat ulang setiap render, menghemat re-render di komponen yang
  const submitForm = useCallback(
    async (data: RegisterPayload) => {
      const result = registerSchema.safeParse(data);

      if (!result.success) {
        return { success: false, message: 'There something went wrong' };
      }

      try {
        // Kalau login adalah createAsyncThunk, .unwrap() akan lempar error secara langsung kalau gagal,
        // await dispatch(login(data)).unwrap();
        const res = await loginMutate(data);

        setDialog(undefined);
      } catch (error) {
        // Login Error
        return { success: false, message: 'Login failed, please try again' };
      }

      return { success: true, message: 'Request submitted' };
    },
    [loginMutate, setDialog]
  );

  return { submitForm, isPending, isSuccess, ...props };
};
