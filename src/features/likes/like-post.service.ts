import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Like } from './type';

export async function likePostService(id: number): Promise<Like> {
  try {
    const { data } = await axiosInstance.post<Like>(`/api/posts/${id}/like`);

    return data;
  } catch (error) {
    throw error;
  }
}

type UseLikePostParams = {
  mutationConfig?: MutationConfig<typeof likePostService>;
};

export const useLikePost = (params: UseLikePostParams = {}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: likePostService,
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
