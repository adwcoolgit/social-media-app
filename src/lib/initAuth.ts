import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IsLogin } from '@/states/slices/authSlice';
import {
  loginTokenStorageKey,
  loginUserStorageKey,
} from '@/features/auth/login.service';
import { User } from '@/types/user';
import { removeItem } from './storages';

export const InitAuth = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  useEffect(() => {
    const user = loginUserStorageKey();
    const token = loginTokenStorageKey();

    if (token && user) {
      // const parsedUser: User = JSON.parse(user);
      dispatch(IsLogin(true));
    } else {
      removeItem(loginTokenStorageKey());
      removeItem(loginUserStorageKey());
      dispatch(IsLogin(false));
    }
  }, [dispatch, queryClient]);

  return null;
};
