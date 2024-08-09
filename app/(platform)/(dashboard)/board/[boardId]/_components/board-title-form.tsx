'use client';

import { Board } from '@prisma/client';
import { useState } from 'react';
import { z } from 'zod';

import { revalidateBoardPath } from '@/actions/board';
import { FormInput } from '@/components/form/form-input';
import { Button } from '@/components/ui/button';
import { updateBoardById } from '@/services/boardService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

interface BoardTitleFormProps {
  board: Board;
}

const FormSchema = z.object({
  title: z.string().min(3, { message: 'Minimum of 3 characters is required' }),
});

type FormSchemaType = z.infer<typeof FormSchema>;

export const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  // Mutation
  const { isPending, mutate: updateTitle } = useMutation({
    mutationFn: updateBoardById,
    onSuccess: () => {
      revalidateBoardPath(`/board/${board.id}`);

      disableEditing();
    },
  });

  // React hook form
  const {
    watch,
    register,
    setFocus,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  // For Optimistic Update
  const titleInputValue = watch('title');

  const enableEditing = () => {
    setIsEditing(true);

    // Focus input
    setTimeout(() => {
      setFocus('title');
    }, 100);
  };

  const disableEditing = () => setIsEditing(false);

  const onSubmit = (formData: FormSchemaType) => {
    updateTitle({ id: board.id, title: formData.title });
  };

  if (isEditing) {
    return (
      <form
        className='flex items-center gap-x-2'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          className='text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none text-white'
          disabled={isPending}
          defaultValue={board.title}
          {...register('title', {
            onBlur: handleSubmit(onSubmit),
          })}
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      className='font-bold text-lg h-auto w-auto p-1 px-2'
      variant='transparent'
    >
      {titleInputValue ?? board.title}
    </Button>
  );
};
