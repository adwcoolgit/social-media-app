import { InfiniteEntity, Pagination } from './base-entity';
import { User } from './user';

export type RootObject = {
  posts: InfiniteEntity<Post[]>;
};

export type Post = {
  id: number;
  imageUrl: string;
  caption: string;
  createdAt: string;
  author: Author;
  likeCount: number;
  commentCount: number;
  likedByMe: boolean;
};

export type Author = User;

export type Feed = {
  items: Post[];
  pagination: Pagination;
};

export type DeleteStatus = {
  deleted: boolean;
};
