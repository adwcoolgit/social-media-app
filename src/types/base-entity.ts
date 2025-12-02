import { Author } from './post';

export type BaseEntity = {
  id: string;
  createdAt: number;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type InfiniteEntity<T> = {
  [K in keyof T]: T[K];
} & Pagination;

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Likes = {
  liked: boolean;
  likeCount: number;
};

export type Comment = Entity<{
  text: string;
  author: Author;
  isMine: boolean;
}>;

export type Comments = {
  comments: InfiniteEntity<Comment[]>;
};

export type data = {
  datas: Comments;
};
