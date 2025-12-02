import { Entity } from './base-entity';

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export type User = {
  name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
};

export type profilePatchPayload = Entity<User & { bio: string }>;

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
