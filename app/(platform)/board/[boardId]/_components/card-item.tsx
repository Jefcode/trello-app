'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';
import { motion } from 'framer-motion';

import { CardDetailsModal } from '@/components/modals/card-modal';

interface CardItemProps {
  index: number;
  card: Card;
}

export const CardItem = ({ index, card }: CardItemProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <CardDetailsModal cardId={card.id}>
          <motion.li
            key={card.id}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className='py-1.5'
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
              role='button'
            >
              <div className='text-left truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm'>
                {card.title}
              </div>
            </div>
          </motion.li>
        </CardDetailsModal>
      )}
    </Draggable>
  );
};
