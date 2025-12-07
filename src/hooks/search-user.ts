import {
  infinitesUsersQueryOption,
  IServiceProps,
} from '@/features/users/search-users.service';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useSearchUsers = (params: IServiceProps) => {
  return useInfiniteQuery({
    ...infinitesUsersQueryOption(params),
  });
};
