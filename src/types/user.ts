import { Entity, PatchEntity } from './base-entity';

export type User = {
  name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
};

export type ProfilePatch = PatchEntity<User & { bio: string }>;

export type Profile = {
  profile: Entity<User & { bio: string }>;
  stats: Stats;
};

export type Stats = {
  posts: number;
  followers: number;
  following: number;
  likes: number;
};
