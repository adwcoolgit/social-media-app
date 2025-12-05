import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { Likes } from './type';
import { ServiceProps } from '@/types/base-entity';

type UserLiked = Likes;

export async function usersLikedService(
  params: ServiceProps,
  id: number
): Promise<UserLiked> {
  const { data } = await axiosInstance.get<UserLiked>(
    `/api/posts/${id}/likes`,
    {
      params,
    }
  );

  return data;
}

export const infinitesUsersLikedQueryOption = (
  params: ServiceProps,
  id: number
) => {
  return infiniteQueryOptions({
    queryKey: usersLikedQueryKey(params, id),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return usersLikedService(params, id);
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

export type UseUserLikedParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesUsersLikedQueryOption>;
  params: ServiceProps;
};

export const usersLikedStorageKey = () => 'usersLiked';
export const usersLikedQueryKey = (params: ServiceProps, id: number) => [
  'usersLiked',
  params,
  id,
];
