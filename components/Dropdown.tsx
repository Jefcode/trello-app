/**
 * This Component is an Abstraction around the Popover component
 */
import * as PopoverPrimitive from '@radix-ui/react-popover';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import {
  createContext,
  forwardRef,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { Button, ButtonProps } from './ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';

interface IDropdownContext {
  isOpen: boolean;
  close: () => void;
}

const DropdownContext = createContext({} as IDropdownContext);

const Dropdown = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        close: onClose,
      }}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        {children}
      </Popover>
    </DropdownContext.Provider>
  );
};

const DropdownTrigger = (props: PropsWithChildren<ButtonProps>) => {
  const { children, className, variant = 'ghost', ...restProps } = props;
  return (
    <PopoverTrigger asChild>
      <Button
        className={cn('h-auto w-auto p-2', className)}
        variant={variant}
        {...restProps}
      >
        {children}
      </Button>
    </PopoverTrigger>
  );
};

const DropdownContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> & {
    title: string;
  }
>((props, ref) => {
  const {
    children,
    title,
    side = 'bottom',
    align = 'start',
    className,
    ...restProps
  } = props;

  return (
    <PopoverContent
      ref={ref}
      className={cn('px-0 py-3', className)}
      side={side}
      align={align}
      {...restProps}
    >
      <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
        {title}
      </div>

      <PopoverClose asChild>
        <Button
          className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
          variant='ghost'
        >
          <X className='w-4 h-4' />
        </Button>
      </PopoverClose>

      {children}
    </PopoverContent>
  );
});

DropdownContent.displayName = 'DropdownContent';

Dropdown.Button = DropdownTrigger;
Dropdown.Content = DropdownContent;

export const useDropdown = () => {
  return useContext(DropdownContext);
};

export default Dropdown;
