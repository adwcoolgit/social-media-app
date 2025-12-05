import { PatchEntity } from './base-entity';

export type User = {
  is: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatarUrl: string;
};

export type ProfilePatch = PatchEntity<User & { bio: string }>;

export type Profile = {
  profile: User & { bio: string };
  stats: Stats;
};

export type Stats = {
  posts: number;
  followers: number;
  following: number;
  likes: number;
};
