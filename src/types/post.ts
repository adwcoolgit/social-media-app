import { InfiniteEntity } from './base-entity';
import { User } from './login';

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
  items: InfiniteEntity<Post[]>;
};
