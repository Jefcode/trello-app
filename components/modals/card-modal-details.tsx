'use client';

import { useQuery } from '@tanstack/react-query';
import { AlignLeft, Copy, Layout, Trash } from 'lucide-react';

import { DialogTitle } from '@/components/ui/dialog';
import { constants } from '@/lib/react-query/constants';
import { getCardById } from '@/services/cardService';
import FormTextarea from '../form/form-textarea';
import { SubmitButton } from '../form/submit-button';
import { Spinner } from '../spinner';
import { CardModalHeader } from './card-modal-header';
import { CardModalForm } from './card-modal-form';
import { CardModalActions } from './card-modal-actions';

interface CardModalDetail {
  cardId: string;
}

export const CardModalDetail = ({ cardId }: CardModalDetail) => {
  const {
    isLoading,
    data: cardData,
    isError,
  } = useQuery({
    queryKey: [constants.card, cardId],
    queryFn: () => getCardById(cardId),
  });

  if (isLoading) {
    return (
      <div className='p-10 flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (isError) return;

  const card = cardData?.card!;

  return (
    <>
      <DialogTitle className='mb-8'>
        <div className='flex text-neutral-600 gap-x-3'>
          <Layout className='w-5 h-5 mt-1' />

          <CardModalHeader card={card} />
        </div>
      </DialogTitle>

      {/* Descripion / Actions */}
      <div className='flex flex-col md:flex-row items-start gap-4'>
        {/* Description form */}
        <div className='w-full md:flex-1'>
          <div className='flex text-neutral-600 gap-x-3'>
            <AlignLeft className='w-5 h-5 mt-0.5' />
            <div className='space-y-1 w-full'>
              <h3 className='font-semibold mb-3 text-left'>Description</h3>

              <CardModalForm card={card} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className='flex-shrink-0 w-full md:w-40 pl-8 md:pl-0'>
          <p className='font-semibold mb-2 text-sm mt-2 text-neutral-700 text-left'>
            Actions
          </p>

          {/* Actions */}
          <CardModalActions cardId={card.id} />
        </div>
      </div>
    </>
  );
};
