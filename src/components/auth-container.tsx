import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/states/store';
import { Button } from './ui/button';
import { FormLogin } from './compound/login/partial';
import { FieldValues } from 'react-hook-form';
import { setDialog, setToast } from '@/states/slices/uiSlice';
import { Logo } from './logo';
import { GenericFormProps } from '@/types/component-type';

export const AuthContainer = <T extends FieldValues>({
  className,
  isLogin = false,
  isPending = false,
  form,
  onSubmit,
  children,
}: GenericFormProps<T>) => {
  const dialog = useSelector((state: RootState) => state.ui.authDialog);
  const toastMessage = useSelector((state: RootState) => state.ui.toastMessage);
  const dispatch = useDispatch();

  const closeDialog_Click = () => {
    setDialog(undefined);
  };

  const dialogMode_Click = () => {
    closeDialog_Click();
    setDialog(dialog !== 'LOG_IN' ? 'LOG_IN' : 'REGISTER');
  };

  useEffect(() => {
    if (toastMessage) {
      setTimeout(() => {
        dispatch(setToast(toastMessage));
      }, 10000);
    }
  }, [toastMessage]);

  return (
    <>
      <div
        className={cn(
          'mx-1 my-auto flex h-fit w-auto grow items-center justify-center gap-y-4 rounded-xl border bg-white p-8.75 drop-shadow-2xl md:mx-auto md:w-fit md:grow-0 md:p-8',
          className
        )}
      >
        <X
          onClick={closeDialog_Click}
          className='absolute top-2 right-2 cursor-pointer justify-self-end'
        />
        <FormLogin.Root className='h-fit w-full border-0 p-0'>
          <FormLogin.Wrapper className='h-fit w-full border-0 p-0'>
            <FormLogin.Content className='flex flex-col justify-start gap-y-5 p-0'>
              <Logo className='w-full' />
              <div className='w-full gap-y-2'>
                <h1 className='text-display-xs mb-3 leading-9 font-bold md:text-3xl md:leading-12'>
                  {isLogin == true ? 'Login' : 'Register'}
                </h1>
                <p className='md:text-md md:leading-md flex h-7.5 w-fit text-sm leading-3.5 font-semibold tracking-tighter text-neutral-700 md:tracking-tight'>
                  {!isLogin
                    ? `Create your account to start borrowing books.`
                    : `Sign in to manage your library account.`}
                </p>
              </div>
              <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                {children}
                <Button
                  type='submit'
                  className='mb-5 ml-0 flex w-full justify-start md:w-88'
                  disabled={isPending}
                >
                  {isLogin == true ? 'Login' : 'Register'}
                </Button>
              </form>
              <p className='md:text-md leading-sm flex justify-center px-6 text-sm font-semibold text-black md:leading-5'>
                {`${!isLogin ? 'Already' : `Don't`} have an account? `}
                <span
                  onClick={dialogMode_Click}
                  className='text-primary-500 md:text-md leading-sm ml-1 cursor-pointer text-sm font-bold md:leading-5'
                >
                  {isLogin == true ? ' Register' : ' Log In'}
                </span>
              </p>
              <p className='text-field-warning leading-xs mb-4 flex h-1 items-center text-center text-sm font-medium'>
                {toastMessage}
              </p>
            </FormLogin.Content>
          </FormLogin.Wrapper>
        </FormLogin.Root>
      </div>
    </>
  );
};
