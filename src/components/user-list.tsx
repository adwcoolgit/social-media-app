import { IServiceProps } from '@/features/users/search-users.service';
import { useSearchUsers } from '@/hooks/search-user';
import { cn, safeImageSrc } from '@/lib/utils';
import { RootState } from '@/states/store';
import { ComponentProps } from '@/types/component-type';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Activity, useState } from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from './compound/spinner';
import { ArchiveX } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';
import Image from 'next/image';
import noProfileImage from '@/../public/images/profile.jpg';
import { useRouter } from 'next/navigation';

export const UserSearchList: React.FC<ComponentProps> = ({
  children,
  className,
}) => {
  const isSearching = useSelector((state: RootState) => state.ui.searching);
  const searchVal = useSelector((state: RootState) => state.ui.querySearch);
  const params: IServiceProps = { page: 1, limit: 20, q: searchVal };
  const router = useRouter();
  const {
    data: userList,
    isLoading,
    error,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useSearchUsers(params);

  const users = userList?.pages.flatMap((page) => page.users);

  const btnUser_click = (userName: string) => {
    router.push(`/profile/${userName}`);
  };

  return (
    <>
      <Activity mode={isSearching ? 'visible' : 'hidden'}>
        <AnimatePresence>
          <motion.div
            className='min-h-9xl absolute mt-2 max-h-60 w-full overflow-hidden rounded-xl border border-neutral-500/50 bg-neutral-900 p-2'
            initial={{ y: -10, opacity: 0 }}
            whileInView={{
              y: 0,
              opacity: 1,
              animationDuration: 0.1,
            }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ScrollArea className='h-56 w-full rounded-md'>
              <div className='p-4'>
                {users?.map((user, index) => (
                  <div
                    key={index}
                    className='group mb-2 flex cursor-pointer items-center gap-x-3 gap-y-4 border-0 border-white'
                    onClick={() => btnUser_click(user.username)}
                  >
                    <div className='relative size-15 overflow-hidden rounded-full border-0 border-white p-2'>
                      <Image
                        src={safeImageSrc(user.avatarUrl) ?? noProfileImage}
                        alt={user.name}
                        fill
                        className='w-fit border-0 border-white object-contain'
                      />
                    </div>
                    <div className='relative w-auto border-0 text-sm text-white'>
                      {user.name}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>
        </AnimatePresence>
      </Activity>
    </>
  );
};
