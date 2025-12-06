import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Saved } from './type';

export async function savedService(id: number): Promise<Saved> {
  try {
    const { data } = await axiosInstance.post<Saved>(`/api/posts/${id}/save`);

    return data;
  } catch (error) {
    throw error;
  }
}

type UseSavedParams = {
  mutationConfig?: MutationConfig<typeof savedService>;
};

export const useSavedPost = (params: UseSavedParams = {}) => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: savedService,
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
