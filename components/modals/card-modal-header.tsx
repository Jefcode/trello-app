'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ElementRef, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { revalidateBoard } from '@/actions/board';
import { constants } from '@/lib/react-query/constants';
import { TitleFormType, titleSchema } from '@/schemas';
import { updateCardById } from '@/services/cardService';
import { CardWithList } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { FormInput } from '../form/form-input';

export const CardModalHeader = ({ card }: { card: CardWithList }) => {
  const queryClient = useQueryClient();

  const params = useParams();
  const boardId = params.boardId as string;

  const formRef = useRef<ElementRef<'form'>>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(card.title);

  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = useForm<TitleFormType>({
    resolver: zodResolver(titleSchema),
  });

  // Mutation => update title
  const updateMutation = useMutation({
    mutationFn: updateCardById,
    onSuccess: (data) => {
      const newTitle = data.card.title;
      toast.success(`card "${newTitle}" was updated`);

      setTitle(newTitle);

      disableEditing();

      revalidateBoard(boardId);
      queryClient.invalidateQueries({ queryKey: [constants.card, card.id] });
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      setFocus('title');
    }, 25);
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (formData: TitleFormType) => {
    if (formData.title === card.title) {
      disableEditing();
      return;
    }

    updateMutation.mutate({
      cardId: card.id,
      title: formData.title,
      description: card.description ?? '',
    });
  };

  return (
    <div className='space-y-1 '>
      {isEditing ? (
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            disabled={updateMutation.isPending}
            defaultValue={card.title}
            className='text-xl font-semibold px-[7px] py-1 h-7 border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white -ml-2'
            {...register('title', { onBlur: handleSubmit(onSubmit) })}
            error={errors.title}
          />
        </form>
      ) : (
        <div
          className='font-semibold text-xl'
          onClick={enableEditing}
          role='button'
        >
          {title}
        </div>
      )}

      {/* Subtitle */}
      <div className='text-sm text-neutral-400 font-normal'>
        In list <span className='underline'>{card?.list.title}</span>
      </div>
    </div>
  );
};
