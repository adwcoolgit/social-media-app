'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ChevronDown, Menu, Search, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import {
  AuthDialog,
  isVisibleMenu,
  isVisibleSearch,
  setDialog,
} from '@/states/slices/uiSlice';
import { ListOption } from '@/components/list-option';
import { SearchBox } from '@/components/search-box';
import { User } from '@/types/user';
import { ComponentProps } from '@/types/component-type';

export interface StateProps {
  search: boolean;
  menu: boolean;
}

const defaultState: StateProps = {
  search: false,
  menu: false,
};

export const UtilityBar: React.FC<ComponentProps> = ({ className }) => {
  const authDialog = useSelector((state: RootState) => state.ui.authDialog);
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const currentUser: User | null = isLogin ? null : null;
  const [hideUtility] = useState<StateProps>(defaultState);
  const visibleSearch = useSelector((state: RootState) => state.ui.search);

  const btnAuth_Click = (state: AuthDialog) => {
    setDialog(state);
  };

  return (
    <>
      {currentUser ? (
        <div
          className={cn(
            'relative flex w-full items-center justify-end gap-x-6 md:w-auto',
            className
          )}
        >
          <CartUtility className='hidden md:flex' />

          <CartBadge className='md:hidden' />

          {!visibleSearch && (
            <ListOption className='flex-center bg-background flex size-10 cursor-pointer overflow-hidden rounded-full border md:size-12'>
              {/* {currentUser.avatarUrl?.src ? (
                <Image
                  src={currentUser.avatarUrl}
                  alt='user account'
                  fill
                  className='absolute object-contain'
                />
              ) : (
                <Icon
                  icon='gridicons:user'
                  className='flex size-7 md:size-10'
                />
              )} */}
              <></>
            </ListOption>
          )}
          <div className='leading-lg hidden cursor-pointer items-center text-center text-lg font-semibold md:flex'>
            <ListOption>
              {/* {currentUser.name} */}
              <ChevronDown className='hidden cursor-pointer text-black md:block' />
            </ListOption>
          </div>
        </div>
      ) : (
        <div className='relative mx-0 flex justify-end'>
          {/* Login & Register button */}
          <AuthButton
            className={`md:mt-none absolute mt-10 w-auto md:relative`}
            btnLogin={btnAuth_Click}
            hideUtility={hideUtility}
          />
          <CartBadge className='md:hidden' />
        </div>
      )}
    </>
  );
};

interface FunctionProps extends ComponentProps {
  hideUtility: StateProps;
  btnSearch?: (state: boolean) => void;
  btnMenu?: (state: boolean) => void;
  btnLogin?: (state: AuthDialog) => void;
}

const CartBadge: React.FC<ComponentProps> = ({ className }) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const visibleMenu = useSelector((state: RootState) => state.ui.menu);
  const visibleSearch = useSelector((state: RootState) => state.ui.search);
  const dispatch = useDispatch();

  return (
    <div
      className={cn(
        'container flex h-fit w-auto grow items-center justify-end gap-x-6 md:w-fit',
        className
      )}
    >
      {visibleSearch || visibleMenu ? (
        <div className='ml-4 flex w-full items-center gap-x-4'>
          {visibleSearch && (
            <>
              <SearchBox className='left-0 flex h-10 w-full' />
              <X
                onClick={() => {
                  dispatch(isVisibleSearch(!visibleSearch));
                }}
              />
            </>
          )}
          {visibleMenu && (
            <div className='flex h-6 w-full justify-end gap-x-4'>
              <Search
                className='block size-6 w-fit'
                onClick={() => {
                  dispatch(isVisibleSearch(!visibleSearch));
                  dispatch(isVisibleMenu(!visibleMenu));
                }}
              />
              <X
                className='block size-6 w-fit'
                onClick={() => dispatch(isVisibleMenu(!visibleMenu))}
              />
            </div>
          )}
        </div>
      ) : (
        <div className='flex gap-x-4 md:gap-x-6'>
          <div>
            <Search
              className='block size-6 w-full md:hidden'
              onClick={() => dispatch(isVisibleSearch(!visibleSearch))}
            />
          </div>
          {visibleSearch && <CartUtility />}
          {!isLogin && (
            <Menu
              onClick={() => dispatch(isVisibleMenu(!visibleMenu))}
              className='block size-6 md:hidden'
            />
          )}
        </div>
      )}
    </div>
  );
};

const AuthButton: React.FC<FunctionProps> = ({
  className,
  btnLogin = (_value) => {},
}) => {
  const visibleMenu = useSelector((state: RootState) => state.ui.menu);
  const dispatch = useDispatch();

  const cmdAuth_Click = () => {
    dispatch(isVisibleMenu(false));
  };

  return (
    <div
      className={cn(
        `${visibleMenu ? 'flex' : 'hidden'} md:p-none gap-x-3 p-4 md:flex md:gap-x-4`,
        className
      )}
    >
      <Button
        onClick={() => {
          btnLogin('LOG_IN');
          cmdAuth_Click();
        }}
        variant='outline'
        className='h-11 w-32.5'
        id='login'
      >
        Login
      </Button>
      <Button
        onClick={() => {
          btnLogin('REGISTER');
          cmdAuth_Click();
        }}
        variant='default'
        className='h-11 w-32.5'
        id='register'
      >
        Register
      </Button>
    </div>
  );
};

const CartUtility: React.FC<ComponentProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'relative block size-7 cursor-pointer items-center justify-end md:size-8',
        className
      )}
    >
      <Icon icon='lets-icons:bag-fill' width='32' height='32' />
      <p className='bg-field-warning text-background flex-center absolute top-0 right-0 flex size-5 translate-x-1/4 -translate-y-1/4 rounded-full text-center text-xs font-bold'>
        1
      </p>
    </div>
  );
};
