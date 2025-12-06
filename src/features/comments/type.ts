import { Entity, InfiniteEntity, Pagination } from '@/types/base-entity';
import { Author } from '@/types/post';

export type PostComments = {
  comments: Comment[];
  pagination: Pagination;
};

export type Comment = Entity<{
  text: string;
  createdAt: string;
  author: Author;
  isMine: boolean;
}>;

export type Comments = {
  comments: InfiniteEntity<Comment[]>;
};
