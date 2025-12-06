import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Follow } from './type';

export async function userFollowService(username: string): Promise<Follow> {
  try {
    const { data } = await axiosInstance.post<Follow>(
      `/api/follow/${username}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

type UseUserFollowParams = {
  mutationConfig?: MutationConfig<typeof userFollowService>;
};

export const useUserFollow = (params: UseUserFollowParams = {}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: userFollowService,
    ...params.mutationConfig,
    onSuccess: (data, variable, onMutateResult, context) => {
      if (!data) return;

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
