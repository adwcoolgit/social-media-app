import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

type RootProps = {
  children: ReactNode;
  className?: string;
};

export const Root: React.FC<RootProps> = ({ children, className }) => {
  return <div className={cn('mx-auto w-screen', className)}>{children}</div>;
};
