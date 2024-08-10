import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';
import { Label } from '../ui/label';
import { Textarea, TextareaProps } from '../ui/textarea';

const FormTextarea = forwardRef<
  HTMLTextAreaElement,
  TextareaProps & { label?: string; error?: FieldError }
>(({ className, label, error, ...props }, ref) => {
  return (
    <div className='space-y-2 w-full'>
      <div className='space-y-1 w-full'>
        {label && (
          <Label
            htmlFor={props.id}
            className='text-xs font-semibold text-neutral-700'
          >
            {label}
          </Label>
        )}

        <Textarea
          ref={ref}
          {...props}
          className={cn(
            'resize-none font-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm bg-white',
            className
          )}
        />

        {error && <p className='text-xs text-rose-500'>{error.message}</p>}
      </div>
    </div>
  );
});

FormTextarea.displayName = 'Textarea';

export default FormTextarea;
