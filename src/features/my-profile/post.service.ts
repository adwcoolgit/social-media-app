import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { Feed } from '@/types/post';
import { infiniteQueryOptions } from '@tanstack/react-query';

export type MyPostQueryProps = {
  page: number;
  limit: number;
};

export async function myPostService(params: MyPostQueryProps): Promise<Feed> {
  const { data } = await axiosInstance.get<Feed>('/api/me/posts', { params });

  return data;
}

export const infinitesMyPostQueryOption = (params: MyPostQueryProps) => {
  return infiniteQueryOptions({
    queryKey: getMyPostQueryKey(params),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return myPostService(params);
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

export type UseMyPostParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesMyPostQueryOption>;
  params: MyPostQueryProps;
};

export const myPostStorageKey = () => 'myPost';
export const getMyPostQueryKey = (params: MyPostQueryProps) => [
  'myPost',
  params,
];
