import { MutationConfig } from '@/lib/react-query';
import { RegisterPayload } from '@/schemas/register.schema';
import { IsRegister } from '@/states/slices/authSlice';
import { setToast } from '@/states/slices/uiSlice';
import { RootState } from '@/states/store';
import { RegisterResponse } from '@/types/register';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { loginTokenStorageKey, loginUserStorageKey } from './login.service';
import axios from 'axios';
import { User } from '@/types/user';
import { getUserQueryKey } from '../my-profile/me.service';

export async function registerService(
  params: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await axios.post<RegisterResponse>(
    '/api/auth/register',
    params
  );

  return data;
}

type UseRegisterParam = {
  mutationConfig?: MutationConfig<typeof registerService>;
};

export const useRegister = (params: UseRegisterParam = {}) => {
  const isRegister = useSelector((state: RootState) => state.auth.isRegister);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: registerService,
    ...params.mutationConfig,
    onSuccess: (data, variables, onMutationResult, contex) => {
      if (isRegister) return;

      if (!data.token) return;

      localStorage.setItem(JSON.stringify(data), loginUserStorageKey());
      localStorage.setItem(data.token, loginTokenStorageKey());
      queryClient.setQueryData<User>(getUserQueryKey(), data.user);

      dispatch(IsRegister(true));

      params.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutationResult,
        contex
      );
    },
    onError: (error) => {
      let message = 'Something went wrong';

      if (axios.isAxiosError(error)) {
        message = error.response?.data.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      dispatch(setToast(message));
    },
    retry: false,
  });
};
