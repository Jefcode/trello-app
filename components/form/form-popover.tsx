'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { X } from 'lucide-react';
import { ElementRef, PropsWithChildren, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { createBoard } from '@/services/boardService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FormInput } from './form-input';
import { FormPicker } from './form-picker';
import { SubmitButton } from './submit-button';

interface FormPopoverProps extends PropsWithChildren {
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

const CreateBoardSchema = z.object({
  title: z.string().min(3, { message: 'Minimum of 3 characters is required' }),
  imageData: z.string({
    required_error: 'Please select an image',
    invalid_type_error: 'Image is required',
  }),
});

type CreateBoardSchemaType = z.infer<typeof CreateBoardSchema>;

export const FormPopover = ({
  children,
  side = 'bottom',
  align,
  sideOffset = 0,
}: FormPopoverProps) => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<'button'>>(null);

  // Form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateBoardSchemaType>({
    resolver: zodResolver(CreateBoardSchema),
  });

  // Mutation
  const { isPending, mutate } = useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      // reset the form
      reset();
      toast.success('Board successfully created');

      // Close the popover
      closeRef.current?.click();
      router.push(`/board/${data.board.id}`);
    },
  });

  // Submit handler
  const onSubmit = (data: CreateBoardSchemaType) => {
    mutate(data);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className='w-80 pt-3'
        side={side}
        sideOffset={sideOffset}
      >
        <div className='text-sm font-medium text-center text-neutral-600 pb-4'>
          Create board
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='ghost'
          >
            <X className='h-4 w-4' />
          </Button>
        </PopoverClose>

        {/* Form  */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='space-y-4'>
            <Controller
              control={control}
              name='imageData'
              render={({ field: { onChange } }) => (
                <FormPicker
                  onChange={(imageData) => onChange(imageData)}
                  error={errors.imageData}
                />
              )}
            />

            {/* Input */}
            <FormInput
              label='Board title'
              {...register('title')}
              error={errors.title}
            />

            {/* Submit Button */}
            <SubmitButton loading={isPending}>Create</SubmitButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
