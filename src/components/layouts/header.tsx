'use client';

import { RootState } from '../../states/store';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMotionValueEvent, useScroll, motion } from 'framer-motion';
import { UIHeaderSearchBar } from '../compound/header-search-bar/partials';
import { UIAuthLogin } from '../compound/login/layout';
import { UIRegisterDialog } from '../compound/register/layout';

export function Header() {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);
  const dialog = useSelector((state: RootState) => state.ui.authDialog);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous: number | undefined = scrollY.getPrevious();

    if (latest > (previous ?? 0) && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.div
      variants={{
        visible: { y: 0 },
        hidden: { y: '-200%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      <div className='bg-background/10 sticky top-0 z-50 flex border py-3 backdrop-blur-md md:py-4.5'>
        <UIHeaderSearchBar.Wrapper className='flex-between'>
          <UIHeaderSearchBar.Logo className='' />
          <div className='flex w-full grow justify-center'>
            {isLogin && (
              <UIHeaderSearchBar.Search className='flex w-125 justify-center' />
            )}
          </div>
          <UIHeaderSearchBar.Content className='' />
        </UIHeaderSearchBar.Wrapper>
      </div>
      {dialog === 'LOG_IN' ? (
        <UIAuthLogin className='' />
      ) : dialog === 'REGISTER' ? (
        <UIRegisterDialog />
      ) : (
        <></>
      )}
    </motion.div>
  );
}
