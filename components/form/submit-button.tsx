import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Spinner } from '../spinner';

interface SubmitButtonProps extends ButtonProps {
  loading?: boolean;
}

export const SubmitButton = (props: SubmitButtonProps) => {
  const {
    className,
    children,
    loading,
    variant = 'primary',
    ...restProps
  } = props;

  return (
    <fieldset disabled={loading} className='group w-full'>
      <Button
        className={cn('w-full relative', className)}
        variant={variant}
        {...restProps}
      >
        <div className='group-disabled:opacity-0 w-full'>{children}</div>
        <div className=' absolute inset-0 flex items-center justify-center'>
          <Spinner className='group-enabled:opacity-0 w-5 h-5' />
        </div>
      </Button>
    </fieldset>
  );
};
