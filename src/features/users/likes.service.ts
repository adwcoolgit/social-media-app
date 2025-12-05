import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { Likes } from './type';
import { ServiceProps } from '@/types/base-entity';

export async function myLikesService(
  params: ServiceProps,
  username: string
): Promise<Likes> {
  const { data } = await axiosInstance.get<Likes>(
    `/api/users/${username}/likes`,
    { params }
  );

  return data;
}

export const infinitesMyLikesQueryOption = (
  params: ServiceProps,
  username: string
) => {
  return infiniteQueryOptions({
    queryKey: myLikesQueryKey(params, username),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return myLikesService(params, username);
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

export type UseMyLikesParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesMyLikesQueryOption>;
  params: ServiceProps;
};

export const myLikesStorageKey = () => 'myLikes';
export const myLikesQueryKey = (params: ServiceProps, username: string) => [
  'myLikes',
  params,
  username,
];
