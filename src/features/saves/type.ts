import { Pagination } from '@/types/base-entity';
import { Post } from '@/types/post';

export type Saved = {
  saved: boolean;
};

export type MySavesPost = {
  post: Post[];
  pagination: Pagination;
};
