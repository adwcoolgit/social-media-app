import { useLogin } from '@/features/auth/login.service';
import { LoginPayload, loginSchema } from '@/schemas/login.schema';
import { setDialog } from '@/states/slices/uiSlice';
import { RootState } from '@/states/store';
import { useCallback, useContext } from 'react';
import { useSelector } from 'react-redux';

export const useLoginAction = () => {
  const authDialog = useSelector((state: RootState) => state.ui.authDialog);
  const {
    mutateAsync: loginMutate,
    isPending,
    isSuccess,
    ...props
  } = useLogin();

  const submitForm = useCallback(
    async (data: LoginPayload) => {
      const result = loginSchema.safeParse(data);

      if (!result.success) {
        return { success: false, message: 'There something went wrong' };
      }

      try {
        const res = await loginMutate(data);
        setDialog(undefined);
        return res;
      } catch {
        return { success: false, message: 'Login failed, please try again' };
      }

      // return { success: true, message: 'Request submitted' };
    },
    [loginMutate, setDialog]
  );

  return { submitForm, isPending, isSuccess, ...props };
};
