'use client';

import { PropsWithChildren } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CardModalDetail } from './card-modal-details';

export const CardDetailsModal = ({
  children,
  cardId,
}: PropsWithChildren<{ cardId: string }>) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className='w-[700px] max-w-[calc(100vw-50px)]'>
        {/* For screen readers */}
        <DialogTitle className='hidden' >Card Description</DialogTitle>

        <CardModalDetail cardId={cardId} />
      </DialogContent>
    </Dialog>
  );
};
