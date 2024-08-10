'use client';

import { CardDetailsModal } from '@/components/modals/CardDetailsModal';
import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';

interface CardItemProps {
  index: number;
  card: Card;
}

export const CardItem = ({ index, card }: CardItemProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <>
          <CardDetailsModal>
            <div
              {...provided.dragHandleProps}
              {...provided.draggableProps}
              ref={provided.innerRef}
              role='button'
              className='text-left truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm'
            >
              {card.title}
            </div>
          </CardDetailsModal>
        </>
      )}
    </Draggable>
  );
};
