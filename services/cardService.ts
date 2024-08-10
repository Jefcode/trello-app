import { axiosInstance } from '@/lib/axios';

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
