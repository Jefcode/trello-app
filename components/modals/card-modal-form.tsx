'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { revalidateBoard } from '@/actions/board';
import { constants } from '@/lib/react-query/constants';
import { updateCardById } from '@/services/cardService';
import { KeyboardEventHandler } from 'react';
import FormTextarea from '../form/form-textarea';

const schema = z.object({
  description: z
    .string()
    .max(200, { message: 'Maximum of 200 characters is allowed' }),
});

type FormType = {
  description?: string;
};

export const CardModalForm = ({ card }: { card: Card }) => {
  const queryClient = useQueryClient();
  const params = useParams();
  const boardId = params.boardId as string;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      description: card.description ?? '',
    },
  });

  // Mutation => update description
  const updateMutation = useMutation({
    mutationFn: updateCardById,
    onSuccess: (data) => {
      const newTitle = data.card.title;
      toast.success(`card "${newTitle}" was updated`);

      revalidateBoard(boardId);
      queryClient.invalidateQueries({ queryKey: [constants.card, card.id] });
    },
  });

  const onSubmit = (data: FormType) => {
    if (data.description?.trim() === card.description) return;

    updateMutation.mutate({
      cardId: card.id,
      title: card.title,
      description: data.description ?? '',
    });
  };

  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTextarea
        onKeyDown={onTextareaKeyDown}
        disabled={updateMutation.isPending}
        className='w-full bg-neutral-100 rounded-none border-none h-20'
        placeholder='Add a description here'
        {...register('description', {
          onBlur: handleSubmit(onSubmit),
        })}
        error={errors.description}
      />
    </form>
  );
};
