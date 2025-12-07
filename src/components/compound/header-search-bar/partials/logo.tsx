import { cn } from '@/lib/utils';
import Image from 'next/image';
import { ReactNode } from 'react';

interface UILogoProps {
  className?: string;
}

export const UILogo: React.FC<UILogoProps> = ({ className }) => {
  return (
    <div className={cn('max-w-1/6 w-full', className)}>
      <Image
        src={'/logo/freshcart-logo.svg'}
        alt='freshcart-logo'
        width={160}
        height={31}
        className='md:max-h-8 md:max-w-40'
      />
    </div>
  );
};
