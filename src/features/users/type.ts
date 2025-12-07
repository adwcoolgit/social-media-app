import { Pagination } from '@/types/base-entity';
import { Post } from '@/types/post';
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

export type User = {
  id: number;
  username: string;
  name: string;
  avatarUrl: undefined | string;
  isFollowedByMe: boolean;
};
