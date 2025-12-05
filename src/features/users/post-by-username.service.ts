import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { Likes } from './type';
import { ServiceProps } from '@/types/base-entity';

type PostByUserName = Likes;

export async function postByUserNameService(
  params: ServiceProps,
  username: string
): Promise<PostByUserName> {
  const { data } = await axiosInstance.get<PostByUserName>(
    `/api/users/${username}/posts`,
    {
      params,
    }
  );

  return data;
}

export const infinitesPostByUserNameQueryOption = (
  params: ServiceProps,
  username: string
) => {
  return infiniteQueryOptions({
    queryKey: postByUserNameQueryKey(params, username),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return postByUserNameService(params, username);
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
  queryConfig?: InfiniteQueryConfig<typeof infinitesPostByUserNameQueryOption>;
  params: ServiceProps;
};

export const postByUserNameStorageKey = () => 'postByUserName';
export const postByUserNameQueryKey = (
  params: ServiceProps,
  username: string
) => ['postByUserName', params, username];
