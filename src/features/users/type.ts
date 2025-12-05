import { Pagination } from '@/types/base-entity';
import { Post } from '@/types/post';
import { User } from '@/types/user';
import { Stats } from 'fs';

export type Likes = {
  post: Post[];
  pagination: Pagination;
};

export type Users = {
  users: User[];
  pagination: Pagination;
};

export type UserProfile = {
  profile: User & { bio: string };
  counts: Stats;
  isFollowing: boolean;
  isMe: boolean;
};
