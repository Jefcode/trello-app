import { axiosInstance } from '@/lib/axios';
import { CardWithList } from '@/types';
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

export const getCardById = async (
  cardId: string
): Promise<{ card: CardWithList }> => {
  const response = await axiosInstance.get(`/api/cards/${cardId}`);

  return response.data;
};

export const updateCardById = async ({
  cardId,
  title,
  description,
}: {
  cardId: string;
  title: string;
  description: string;
}) => {
  const response = await axiosInstance.patch(`/api/cards/${cardId}`, {
    title,
    description,
  });

  return response.data;
};
