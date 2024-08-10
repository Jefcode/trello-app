import { axiosInstance } from '@/lib/axios';
import { Card } from '@prisma/client';

/**
 * All services that have to do with cards
 */
export const createCard = async ({
  listId,
  title,
}: {
  listId: string;
  title: string;
}) => {
  const response = await axiosInstance.post(`/api/cards`, {
    listId,
    title,
  });

  return response.data;
};

export const cardsReorder = async (items: Card[]) => {
  const response = await axiosInstance.patch('/api/cards/reorder', {
    items,
  });

  return response.data;
};
