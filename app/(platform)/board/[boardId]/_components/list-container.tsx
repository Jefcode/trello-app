'use client';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { revalidateBoard } from '@/actions/board';
import { cardsReorder } from '@/services/cardService';
import { listReorder } from '@/services/listService';
import { ListWithCards } from '@/types';

import { AnimatePresence } from 'framer-motion';
import { ListForm } from './list-form';
import { ListItem } from './list-item';

interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  /**
   * Mutation => reorder list
   */
  const reorderListsMutation = useMutation({
    mutationFn: listReorder,
    onSuccess(data) {
      toast.success('Lists has been re-ordered');

      revalidateBoard(boardId);
    },
  });

  /**
   * Mutation => reorder cards
   */
  const reorderCardsMutation = useMutation({
    mutationFn: cardsReorder,
    onSuccess() {
      toast.success('cards has been re-ordered');

      revalidateBoard(boardId);
    },
  });

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // if user moves a list
    if (type === 'list') {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      );

      setOrderedData(items);
      reorderListsMutation.mutate(items);
    }

    // if user moves a card
    if (type === 'card') {
      let newOrderedData = [...orderedData];

      // source and destination list
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId
      );
      const destList = newOrderedData.find(
        (list) => list.id === destination.droppableId
      );

      if (!sourceList || !destList) return;

      // Check if cards exists on the sourceList
      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      // Check if cards exists on the destList
      if (!destList.cards) {
        destList.cards = [];
      }

      // Moving the card in the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, idx) => {
          card.order = idx;
        });

        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
        reorderCardsMutation.mutate(reorderedCards);
      } else {
        // User moves the card to another list
        // Remove card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        // Assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        // Add card to the destination list
        destList.cards.splice(destination.index, 0, movedCard);

        sourceList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        // Update the order for each card in the destination list
        destList.cards.forEach((card, idx) => {
          card.order = idx;
        });

        setOrderedData(newOrderedData);
        reorderCardsMutation.mutate(destList.cards);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='lists' type='list' direction='horizontal'>
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className='flex h-full'
          >
            <AnimatePresence>
              {orderedData.map((list, index) => (
                <ListItem key={list.id} index={index} data={list} />
              ))}
            </AnimatePresence>

            {provided.placeholder}

            <ListForm />
            <div className='flex-shrink-0 w-1'></div>
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
