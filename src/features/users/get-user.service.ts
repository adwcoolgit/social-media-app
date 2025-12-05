import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { queryOptions } from '@tanstack/react-query';
import { UserProfile } from './type';

export async function userProfileService(
  username: string
): Promise<UserProfile> {
  const { data } = await axiosInstance.get<UserProfile>(
    `/api/users/${username}`
  );

  return data;
}

export const userProfileQueryOption = (username: string) => {
  return queryOptions({
    queryKey: userProfileQueryKey(username),
    queryFn: () => userProfileService(username),
    staleTime: 1000 * 60,
  });
};

export type UseUserProfileQueryParam = {
  queryConfig?: QueryConfig<typeof userProfileQueryOption>;
};

export const userProfileQueryKey = (username: string) => [
  'userProfile',
  username,
];
