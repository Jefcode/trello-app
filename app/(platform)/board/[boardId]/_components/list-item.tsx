'use client';

import { Draggable, Droppable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { ListWithCards } from '@/types';

import { AddCard } from './add-card';
import { CardItem } from './card-item';
import { ListHeader } from './list-header';

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <motion.li
          key={data.id}
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.3 }}
        >
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            className='shrink-0 h-full w-[272px] select-none px-2'
          >
            <div
              {...provided.dragHandleProps}
              className='w-full rounded-md bg-[#f1f2f4] shadow-md pb-2'
            >
              <ListHeader listData={data} />

              <Droppable droppableId={data.id} type='card'>
                {(provided) => (
                  <ol
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cn(
                      'mx-1 px-1 py-0.5 flex flex-col gap-y-2',
                      data.cards.length > 0 ? 'mt-2' : 'mt-0'
                    )}
                  >
                    {data.cards.map((card, index) => (
                      <CardItem key={card.id} index={index} card={card} />
                    ))}

                    {provided.placeholder}
                  </ol>
                )}
              </Droppable>

              <AddCard listData={data} />
            </div>
          </div>
        </motion.li>
      )}
    </Draggable>
  );
};
