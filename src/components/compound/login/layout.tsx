'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useLoginAction } from './action';
import { LoginPayload, loginSchema } from '@/schemas/login.schema';
import { InputGroup } from '@/components/input-group';
import { AuthContainer } from '@/components/auth-container';

interface DialogLoginProps {
  className?: string;
}

export const UIAuthLogin: React.FC<DialogLoginProps> = ({ className }) => {
  const { isPending, submitForm, isSuccess, isError, error } = useLoginAction();

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = (data: LoginPayload) => {
    submitForm(data);
  };

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        className={cn(
          'sm:px-auto bg-background/90 absolute top-0 z-50 flex min-h-screen w-screen px-0',
          className
        )}
        initial={{ y: 0, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1, animationDuration: 0.5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        exit={{ opacity: 0, y: 0 }}
      >
        <AuthContainer
          form={form}
          onSubmit={onSubmit}
          isLogin={true}
          className='md:w-fit'
          isPending={isPending}
          error={error}
        >
          <InputGroup
            id='email'
            title='Email address'
            type='text'
            {...form.register('email')}
            placeholder='Email'
            errrorMessage={form.formState.errors.email?.message}
          />
          <InputGroup
            id='password'
            title='Password'
            type='password'
            {...form.register('password')}
            placeholder='Password'
            errrorMessage={form.formState.errors.password?.message}
          />
        </AuthContainer>
      </motion.div>
    </AnimatePresence>
  );
};
