import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { ServiceProps } from '@/types/base-entity';
import { PostComments } from './type';

export async function postCommentsService(
  params: ServiceProps,
  id: number
): Promise<PostComments> {
  const { data } = await axiosInstance.get<PostComments>(
    `/api/posts/${id}/comments`,
    {
      params,
    }
  );

  return data;
}

export const infinitesPostCommentsQueryOption = (
  params: ServiceProps,
  id: number
) => {
  return infiniteQueryOptions({
    queryKey: postCommentsQueryKey(params, id),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return postCommentsService(params, id);
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

export type UsePostCommentsParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesPostCommentsQueryOption>;
  params: ServiceProps;
};

export const postCommentsStorageKey = () => 'postComments';
export const postCommentsQueryKey = (params: ServiceProps, id: number) => [
  'postComments',
  params,
  id,
];
