import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Comments } from './type';

export async function commentedService(id: number): Promise<Comments> {
  try {
    const { data } = await axiosInstance.post<Comments>(
      `/api/posts/${id}/comments`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

type UseCommentedParams = {
  mutationConfig?: MutationConfig<typeof commentedService>;
};

export const useCommentedPost = (params: UseCommentedParams = {}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: commentedService,
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
