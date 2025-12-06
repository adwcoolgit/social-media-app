import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { DeleteStatus } from '@/types/post';

export async function deleteSavesPostService(
  id: number
): Promise<DeleteStatus> {
  try {
    const { data } = await axiosInstance.post<DeleteStatus>(
      `/api/posts/${id}/save`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

type UseDeleteSavesPostParams = {
  mutationConfig?: MutationConfig<typeof deleteSavesPostService>;
};

export const useDeleteSavesPost = (params: UseDeleteSavesPostParams = {}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: deleteSavesPostService,
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
