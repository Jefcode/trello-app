'use client';

import { useMutation } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { ElementRef, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { z } from 'zod';

import { revalidateBoardPath } from '@/actions/board';
import { FormInput } from '@/components/form/form-input';
import { SubmitButton } from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { createList } from '@/services/listService';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ListWrapper } from './list-wrapper';

export const CreateListSchama = z.object({
  title: z.string().min(3, { message: 'minimum of 3 characters is required' }),
});

type CreateListType = z.infer<typeof CreateListSchama>;

export const ListForm = () => {
  const params = useParams();
  const router = useRouter();
  const formRef = useRef<ElementRef<'form'>>(null);

  const [isEditing, setIsEditing] = useState(false);

  // Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    reset,
  } = useForm<CreateListType>({
    resolver: zodResolver(CreateListSchama),
  });

  // Mutation
  const { isPending, mutate: createListMutate } = useMutation({
    mutationFn: createList,
    onSuccess: (data) => {
      revalidateBoardPath(`/board/${params.boardId}`);
      toast.success(`List "${data.list.title}" created successfully`);

      disableEditing();

      // reset form
      reset();

      router.refresh();
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      setFocus('title');
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') disableEditing();
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  const onSubmit = (data: CreateListType) => {
    createListMutate({ boardId: params.boardId as string, title: data.title });
  };

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          ref={formRef}
          className='w-full p-3 bg-white rounded-md space-y-4 shadow-md'
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormInput
            className='text-sm px-2 py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition w-full'
            placeholder='Enter list title...'
            {...register('title')}
            error={errors.title}
            disabled={isPending}
          />

          <div className='flex items-center gap-1'>
            <SubmitButton loading={isPending} variant='primary'>
              Add list
            </SubmitButton>

            <Button onClick={disableEditing} variant='ghost' size='sm'>
              <X className='w-5 h-5' />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className='w-full rounded-md bg-white/80 hover:bg-white/50 transition p-3 flex items-center font-medium text-sm'
      >
        <Plus className='h-4 w-4 mr-2' />
        Add a list
      </button>
    </ListWrapper>
  );
};
