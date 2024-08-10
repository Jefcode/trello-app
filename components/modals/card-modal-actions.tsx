'use client';

import { useMutation } from '@tanstack/react-query';
import { Copy, Trash } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

import { revalidateBoard } from '@/actions/board';
import { copyCardById, deleteCardById } from '@/services/cardService';

import { SubmitButton } from '../form/submit-button';
import { useCardModal } from './card-modal';

export const CardModalActions = ({ cardId }: { cardId: string }) => {
  const params = useParams();
  const boardId = params.boardId as string;

  const { close: closeModal } = useCardModal();

  const deleteMutation = useMutation({
    mutationFn: deleteCardById,
    onSuccess: () => {
      closeModal();

      toast.success('card successfully deleted');

      revalidateBoard(boardId);
    },
  });

  const copyMutation = useMutation({
    mutationFn: copyCardById,
    onSuccess: (data) => {
      closeModal();

      toast.success('card successfully copied');

      revalidateBoard(boardId);
    },
  });

  return (
    <div className='flex w-full md:flex-col gap-y-1 gap-x-2 text-neutral-700 text-sm'>
      <SubmitButton
        className='py-1.5 px-2 bg-neutral-100 hover:bg-neutral-100 border border-neutral-300 md:border-transparent hover:border-neutral-700 rounded-none flex-1'
        variant='ghost'
        size='sm'
        onClick={() => copyMutation.mutate(cardId)}
        loading={copyMutation.isPending}
        disabled={copyMutation.isPending}
      >
        <div className='text-left flex items-center gap-2'>
          <Copy className='w-4 h-4' />
          <span className='font-medium text-sm'>Copy</span>
        </div>
      </SubmitButton>
      <SubmitButton
        className='py-1.5 px-2 bg-neutral-100 hover:bg-neutral-100 border border-neutral-300 md:border-transparent hover:border-neutral-700 rounded-none flex-1'
        variant='ghost'
        size='sm'
        onClick={() => deleteMutation.mutate(cardId)}
        loading={deleteMutation.isPending}
        disabled={deleteMutation.isPending}
      >
        <div className='text-left flex items-center gap-2'>
          <Trash className='w-4 h-4' />
          <span>Delete</span>
        </div>
      </SubmitButton>
    </div>
  );
};
