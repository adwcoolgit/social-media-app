import { axiosInstance } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';
import { Post } from '@/types/post';
import { queryOptions } from '@tanstack/react-query';

export async function readPostService(id: string): Promise<Post> {
  const { data } = await axiosInstance.get<Post>(`/api/posts/${id}`);

  return data;
}

export const readPostQueryOption = (id: string) => {
  return queryOptions({
    queryKey: readPostQueryKey(id),
    queryFn: () => readPostService(id),
    staleTime: 1000 * 60,
  });
};

export type UseReadPostQueryParam = {
  queryConfig?: QueryConfig<typeof readPostQueryOption>;
};

export const readPostQueryKey = (id: string) => ['post', id];
