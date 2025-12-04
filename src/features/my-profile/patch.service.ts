import { axiosInstance } from '@/lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { ProfilePatch, User } from '@/types/user';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfileQueryKey } from './me.service';
import axios from 'axios';
import { setToast } from '@/states/slices/uiSlice';
import { useDispatch } from 'react-redux';

type UpdatePayload = User;

export async function profileUpdateService(
  params: UpdatePayload
): Promise<ProfilePatch> {
  const { data } = await axiosInstance.patch<ProfilePatch>('/api/me', params);

  return data;
}

type UseProfileParam = {
  mutationConfig?: MutationConfig<typeof profileUpdateService>;
};

export const useProfileUpdate = (params: UseProfileParam) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: profileUpdateService,
    ...params.mutationConfig,
    onSuccess: (data, variable, onMutateResult, context) => {
      if (!data) return;

      localStorage.setItem(JSON.stringify(data), UserProfileStorageKey());
      queryClient.invalidateQueries({ queryKey: getProfileQueryKey() });

      return { data, variable, onMutateResult, context };
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

export const UserProfileStorageKey = () => 'userProfile';
