import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { LoginPayload } from '@/schemas/login.schema';
import { setToast } from '@/states/slices/uiSlice';
import { LoginResponse } from '@/types/login';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IsRegister } from '@/states/slices/authSlice';
import axios from 'axios';

export async function loginService(
  params: LoginPayload
): Promise<LoginResponse> {
  try {
    const { data } = await axiosInstance.post<LoginResponse>(
      '/api/auth/login',
      params
    );

    return data;
  } catch (error) {
    throw error;
  }
}

type UseLoginParams = {
  mutationConfig?: MutationConfig<typeof loginService>;
};

export const useRegister = (params: UseLoginParams = {}) => {
  const isRegister = useSelector((state: RootState) => state.auth.isRegister);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginService,
    ...params.mutationConfig,
    onSuccess: (data, variable, onMutateResult, context) => {
      if (isRegister) return;

      if (!data.token) return;

      axiosInstance.defaults.headers.Authorization = `Bearer ${data.token}`;

      localStorage.setItem(JSON.stringify(data), loginUserStorageKey());
      localStorage.setItem(data.token, loginTokenStorageKey());

      dispatch(IsRegister(true));
      queryClient.invalidateQueries({ queryKey: ['me'] });

      return {
        data,
        variable,
        onMutateResult,
        context,
      };
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

export const loginUserStorageKey = () => 'user';
export const loginTokenStorageKey = () => 'token';
