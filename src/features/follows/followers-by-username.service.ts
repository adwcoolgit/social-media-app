import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { ServiceProps } from '@/types/base-entity';
import { Followers } from './type';

export async function followersService(
  params: ServiceProps,
  username: string
): Promise<Followers> {
  const { data } = await axiosInstance.get<Followers>(
    `/api/users/${username}/followers`,
    {
      params,
    }
  );

  return data;
}

export const infinitesFollowersQueryOption = (
  params: ServiceProps,
  username: string
) => {
  return infiniteQueryOptions({
    queryKey: followersQueryKey(params, username),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return followersService(params, username);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.page === lastPage?.pagination?.totalPages)
        return undefined;
      const nextPage = lastPage.pagination.page + 1;
      return nextPage;
    },
    initialPageParam: 1,
  });
};

export type UseFollowerParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesFollowersQueryOption>;
  params: ServiceProps;
};

export const followersStorageKey = () => 'followers';
export const followersQueryKey = (params: ServiceProps, username: string) => [
  'followers',
  params,
  username,
];
