'use client';

import { cn } from '@/lib/utils';
import { RegisterPayload, registerSchema } from '@/schemas/register.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import { useRegisterAction } from './action';
import { useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { AuthContainer } from '@/components/auth-container';
import { InputGroup } from '@/components/input-group';

interface UIRegisterDialogProps {
  className?: string;
}

export const UIRegisterDialog: React.FC<UIRegisterDialogProps> = ({
  className,
}) => {
  const router = useRouter();
  const { isPending, submitForm, isSuccess } = useRegisterAction();
  const authDialog = useSelector((state: RootState) => state.ui.authDialog);

  const form = useForm<RegisterPayload>({
    resolver: zodResolver(registerSchema) as Resolver<RegisterPayload>,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      avatar: '',
      avatarUrl: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = (data: RegisterPayload) => {
    submitForm(data);
  };

  return (
    <AnimatePresence key={authDialog}>
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
          isLogin={dialog === 'LOG_IN' ? true : false}
        >
          <InputGroup
            id='name'
            title='Name'
            type='text'
            {...form.register('name')}
            placeholder='Name'
            errrorMessage={form.formState.errors.name?.message}
          />
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
          <InputGroup
            id='confrimPassword'
            title='Confirm Password'
            type='password'
            {...form.register('confirmPassword')}
            placeholder='Confirm Password'
            errrorMessage={form.formState.errors.confirmPassword?.message}
          />
        </AuthContainer>
      </motion.div>
    </AnimatePresence>
  );
};
