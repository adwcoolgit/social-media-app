import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { DeleteStatus } from '@/types/post';

export async function unFollowService(username: string): Promise<DeleteStatus> {
  try {
    const { data } = await axiosInstance.post<DeleteStatus>(
      `/api/follow/${username}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

type UseUnFollowParams = {
  mutationConfig?: MutationConfig<typeof unFollowService>;
};

export const useUnFollow = (params: UseUnFollowParams = {}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: unFollowService,
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
