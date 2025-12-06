import { Pagination } from '@/types/base-entity';
import { User } from '@/types/user';

export type Follow = {
  following: boolean;
};

export type Followers = {
  users: Follower[];
  pagination: Pagination;
};

export type Follower = User & {
  isFollowedByMe: boolean;
};

export type Following = Followers;
