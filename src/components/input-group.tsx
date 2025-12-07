import { cn } from '@/lib/utils';
import { ComponentProps, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from './ui/input';

interface InputGroupProps extends ComponentProps<'input'> {
  title: string;
  errrorMessage?: string;
  useFormReturn?: UseFormReturn;
  children?: React.ReactNode;
}

export const InputGroup: React.FC<InputGroupProps> = ({
  id,
  title,
  errrorMessage = '',
  className,
  children,
  ...props
}) => {
  const [eyeOff, setEyeOff] = useState<boolean>(false);

  const btnEye_Click = () => {
    setEyeOff(!eyeOff);
  };

  return (
    <div className={cn('bg-white text-sm font-normal', className)}>
      <label
        className='leading-sm h-fit w-full text-sm font-bold text-neutral-950'
        htmlFor={id}
      >
        {title}
        <div className='relative mt-2 h-fit'>
          <Input
            {...props}
            variant='outline'
            id={id}
            className={`flex h-12 w-full pr-9 text-sm leading-6 font-semibold ${errrorMessage && 'border-field-warning'}`}
            type={
              props.type !== 'password'
                ? props.type
                : !eyeOff
                  ? 'password'
                  : 'text'
            }
            placeholder={props.placeholder}
            autoComplete={id}
          />
          <div className='absolute top-1/2 right-3 -translate-y-1/2 border-0'>
            {props.type === 'password' &&
              (eyeOff == false ? (
                <EyeOff
                  onClick={btnEye_Click}
                  size={18}
                  className='cursor-pointer'
                />
              ) : (
                <Eye
                  onClick={btnEye_Click}
                  size={18}
                  className='cursor-pointer'
                />
              ))}
            {props.type !== 'password' && children}
          </div>
        </div>
      </label>
      <p className='text-field-warning leading-sm mt-1 mb-4 flex h-7 items-center text-center text-sm font-medium'>
        {errrorMessage}
      </p>
    </div>
  );
};
