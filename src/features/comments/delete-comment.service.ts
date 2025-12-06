import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { DeleteStatus } from '@/types/post';

export async function unCommentService(id: number): Promise<DeleteStatus> {
  try {
    const { data } = await axiosInstance.post<DeleteStatus>(
      `/api/comments/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

type UseUnCommentParams = {
  mutationConfig?: MutationConfig<typeof unCommentService>;
};

export const useUnCommentPost = (params: UseUnCommentParams = {}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: unCommentService,
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
