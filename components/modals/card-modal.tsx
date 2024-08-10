'use client';

import { createContext, PropsWithChildren, useContext, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CardModalDetail } from './card-modal-details';

const CardModalContext = createContext(
  {} as {
    close: () => void;
  }
);

export const CardDetailsModal = ({
  children,
  cardId,
}: PropsWithChildren<{ cardId: string }>) => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  return (
    <CardModalContext.Provider
      value={{
        close: onClose,
      }}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className='w-[700px] max-w-[calc(100vw-50px)]'>
          {/* For screen readers */}
          <DialogTitle className='hidden'>Card Description</DialogTitle>

          <CardModalDetail cardId={cardId} />
        </DialogContent>
      </Dialog>
    </CardModalContext.Provider>
  );
};

export const useCardModal = () => useContext(CardModalContext);
