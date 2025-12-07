import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { ServiceProps } from '@/types/base-entity';
import { Following } from './type';

export async function followingService(
  params: ServiceProps,
  username: string
): Promise<Following> {
  const { data } = await axiosInstance.get<Following>(
    `/api/users/${username}/following`,
    {
      params,
    }
  );

  return data;
}

export const infinitesFollowingQueryOption = (
  params: ServiceProps,
  username: string
) => {
  return infiniteQueryOptions({
    queryKey: followingQueryKey(params, username),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return followingService(params, username);
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

export type UseFollowingParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesFollowingQueryOption>;
  params: ServiceProps;
};

export const followingStorageKey = () => 'following';
export const followingQueryKey = (params: ServiceProps, username: string) => [
  'following',
  params,
  username,
];
