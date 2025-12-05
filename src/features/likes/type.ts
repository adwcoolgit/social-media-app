import { Pagination } from '@/types/base-entity';
import { Post } from '@/types/post';
import { User } from '@/types/user';

export type Like = {
  liked: boolean;
  likeCount: number;
};

export type UserLiked = {
  id: number;
  username: string;
  name: string;
  avatarUrl: null;
  isFollowedByMe: boolean;
  isMe: boolean;
  followsMe: boolean;
};

export type Likes = {
  users: UserLiked;
  pagination: Pagination;
};

export type MyLikedPost = {
  post: Post[];
  pagination: Pagination;
};
