import { User } from './user';

export type RegisterResponse = {
  token: string;
  user: User;
};
