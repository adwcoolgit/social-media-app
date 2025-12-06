import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { ServiceProps } from '@/types/base-entity';
import { Followers } from './type';

export async function myFollowersService(
  params: ServiceProps
): Promise<Followers> {
  const { data } = await axiosInstance.get<Followers>(`/api/me/followers`, {
    params,
  });

  return data;
}

export const infinitesMyFollowersQueryOption = (
  params: ServiceProps,
  username: string
) => {
  return infiniteQueryOptions({
    queryKey: myFollowersQueryKey(params),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return myFollowersService(params);
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

export type UseMyFollowerParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesMyFollowersQueryOption>;
  params: ServiceProps;
};

export const myFollowersStorageKey = () => 'myFollowers';
export const myFollowersQueryKey = (params: ServiceProps) => [
  'myFollowers',
  params,
];
