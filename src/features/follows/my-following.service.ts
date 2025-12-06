import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { ServiceProps } from '@/types/base-entity';
import { Following } from './type';

export async function myFollowingService(
  params: ServiceProps
): Promise<Following> {
  const { data } = await axiosInstance.get<Following>(`/api/me/following`, {
    params,
  });

  return data;
}

export const infinitesMyFollowingQueryOption = (
  params: ServiceProps,
  username: string
) => {
  return infiniteQueryOptions({
    queryKey: myFollowingQueryKey(params),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return myFollowingService(params);
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

export type UseMyFollowingParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesMyFollowingQueryOption>;
  params: ServiceProps;
};

export const myFollowingStorageKey = () => 'myFollowing';
export const myFollowingQueryKey = (params: ServiceProps) => [
  'myFollowing',
  params,
];
