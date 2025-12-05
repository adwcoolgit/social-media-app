import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { UploadPostPayload } from '@/schemas/post.schema';
import { UploadPostResponse } from './type';

export async function uploadPostService(
  params: UploadPostPayload
): Promise<UploadPostResponse> {
  try {
    const { data } = await axiosInstance.post<UploadPostResponse>(
      '/api/posts',
      params
    );

    return data;
  } catch (error) {
    throw error;
  }
}

type UseUploadPostParams = {
  mutationConfig?: MutationConfig<typeof uploadPostService>;
};

export const useUploadPost = (params: UseUploadPostParams = {}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: uploadPostService,
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
