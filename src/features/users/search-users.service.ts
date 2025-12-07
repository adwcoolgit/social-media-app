import { axiosInstance } from '@/lib/axios';
import { InfiniteQueryConfig } from '@/lib/react-query';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { Users } from './type';
import { ApiResponse, ServiceProps } from '@/types/base-entity';
import { User } from '@/types/user';

export interface IServiceProps extends ServiceProps {
  q: string;
}
export async function searchUsersService(
  params: IServiceProps
): Promise<Users> {
  const { data } = await axiosInstance.get<ApiResponse<Users>>(
    `/api/users/search`,
    {
      params,
    }
  );

  return data.data as Users;
}

export const infinitesUsersQueryOption = (params: IServiceProps) => {
  return infiniteQueryOptions({
    queryKey: usersQueryKey(params),
    queryFn: ({ pageParam = 1 }) => {
      params.page = pageParam;
      return searchUsersService(params);
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

export type UseSearchUsersParams = {
  queryConfig?: InfiniteQueryConfig<typeof infinitesUsersQueryOption>;
  params: IServiceProps;
};

export const usersStorageKey = () => 'users';
export const usersQueryKey = (params: IServiceProps) => ['users', params];
