'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';
import { z } from 'zod';

import { revalidateBoard } from '@/actions/board';
import { FormInput } from '@/components/form/form-input';
import { titleSchema } from '@/schemas';
import { updateListById } from '@/services/listService';
import { List } from '@prisma/client';

interface ListHeaderProps {
  listData: List;
}

type FormType = z.infer<typeof titleSchema>;

export const ListHeader = ({ listData }: ListHeaderProps) => {
  const router = useRouter();

  const [title, setTitle] = useState(listData.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);

  // Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm<FormType>({
    resolver: zodResolver(titleSchema),
  });

  /**
   * Mutaiton => updating title
   */
  const { mutate: updateListMutate, isPending } = useMutation({
    mutationFn: updateListById,
    onSuccess: (data) => {
      setTitle(data.updatedList.title);
      toast.success(`List "${data.updatedList.title}" updated`);

      disableEditing();

      revalidateBoard(listData.boardId);
      router.refresh();
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      // focus input
      setFocus('title');
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') disableEditing();
  };

  useEventListener('keydown', onKeydown);

  const onSubmit = (data: FormType) => {
    updateListMutate({
      title: data.title,
      id: listData.id,
    });
  };

  return (
    <div className='p-2 text-sm font-semibold flex justify-between items-start gap-x-2'>
      {isEditing ? (
        <form
          ref={formRef}
          className='flex-1 px-[2px]'
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            placeholder='Enter list title...'
            defaultValue={title}
            className='text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white'
            disabled={isPending}
            error={errors.title}
            {...register('title', {
              onBlur: handleSubmit(onSubmit),
            })}
          />
        </form>
      ) : (
        <div
          className='w-full text-sm px-2 5 py-1 h-7 font-medium border-transparent cursor-pointer'
          onClick={enableEditing}
        >
          {title}
        </div>
      )}
    </div>
  );
};
