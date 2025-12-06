import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { ServiceProps } from '@/types/base-entity';
import { MySavesPost } from './type';

export async function mySavesPostService(
  params: ServiceProps
): Promise<MySavesPost> {
  const { data } = await axiosInstance.get<MySavesPost>('mySavesPostService', {
    params,
  });

  return data;
}

export const infinitesMySavesPostQueryOption = (params: ServiceProps) => {
  return infiniteQueryOptions({
    queryKey: mySavesPostQueryKey(params),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return mySavesPostService(params);
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

export type UseMySavesPostParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesMySavesPostQueryOption>;
  params: ServiceProps;
};

export const mySavesPostStorageKey = () => 'mySavesPost';
export const mySavesPostQueryKey = (params: ServiceProps) => [
  'mySavesPost',
  params,
];
