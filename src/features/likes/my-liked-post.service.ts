import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { Feed } from '@/types/post';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { MyLikedPost } from './type';
import { ServiceProps } from '@/types/base-entity';

export async function myLikedPostService(
  params: ServiceProps
): Promise<MyLikedPost> {
  const { data } = await axiosInstance.get<MyLikedPost>('/api/me/likes', {
    params,
  });

  return data;
}

export const infinitesMyLikedPostQueryOption = (params: ServiceProps) => {
  return infiniteQueryOptions({
    queryKey: myLikedPostQueryKey(params),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return myLikedPostService(params);
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

export type UseMyLikedPostParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesMyLikedPostQueryOption>;
  params: ServiceProps;
};

export const myLikedPostStorageKey = () => 'myLikedPost';
export const myLikedPostQueryKey = (params: ServiceProps) => [
  'myLikedPost',
  params,
];
