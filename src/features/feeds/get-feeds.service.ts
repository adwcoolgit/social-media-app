import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { ServiceProps } from '@/types/base-entity';
import { Feed } from '@/types/post';
import { infiniteQueryOptions } from '@tanstack/react-query';

export async function feedsService(params: ServiceProps): Promise<Feed> {
  const { data } = await axiosInstance.get<Feed>('/api/feed', { params });

  return data;
}

export const infinitesFeedsQueryOption = (params: ServiceProps) => {
  return infiniteQueryOptions({
    queryKey: feedsQueryKey(params),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return feedsService(params);
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

export type UseFeedsParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesFeedsQueryOption>;
  params: ServiceProps;
};

export const feedsStorageKey = () => 'feeds';
export const feedsQueryKey = (params: ServiceProps) => ['feeds', params];
