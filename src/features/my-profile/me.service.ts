import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { Profile } from '@/types/user';
import { queryOptions } from '@tanstack/react-query';

export async function profileService(): Promise<Profile> {
  const { data } = await axiosInstance.get<Profile>('/api/me');

  return data;
}

export const profileQueryOption = () => {
  return queryOptions({
    queryKey: getProfileQueryKey(),
    queryFn: profileService,
    staleTime: 1000 * 60,
  });
};

export type UseProfileQueryParam = {
  queryConfig?: QueryConfig<typeof profileQueryOption>;
};

export const getUserQueryKey = () => ['user'];
export const getProfileQueryKey = () => ['profile'];
