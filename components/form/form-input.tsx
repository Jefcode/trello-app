import { forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const { label, error, className, ...restProps } = props;

    return (
      <div className='space-y-1 w-full'>
        {label && <Label htmlFor='title'>{label}</Label>}
        <Input
          ref={ref}
          className={cn(
            'text-neutral-600 focus-visible:ring-black/30 w-full disabled:opacity-70',
            error && 'ring-2 ring-red-500',
            className
          )}
          {...restProps}
        />
        {error && <p className='text-xs text-rose-500'>{error.message}</p>}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
