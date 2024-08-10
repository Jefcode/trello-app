import { axiosInstance } from '@/lib/axios';
import { ListWithCards } from '@/types';

/**
 * All Services and api calls that have to do with lists
 */
export const createList = async ({
  boardId,
  title,
}: {
  boardId: string;
  title: string;
}) => {
  const response = await axiosInstance.post('/api/lists', {
    boardId,
    title,
  });

  return response.data;
};

export const updateListById = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  const response = await axiosInstance.patch(`/api/lists/${id}`, {
    title,
  });

  return response.data;
};

export const deleteListById = async (listId: string) => {
  await axiosInstance.delete(`/api/lists/${listId}`);
};

export const copyListById = async (listId: string) => {
  const response = await axiosInstance.post(`/api/lists/${listId}/copy`);

  return response.data;
};

export const listReorder = async (items: ListWithCards[]) => {
  const response = await axiosInstance.patch('/api/lists/reorder', {
    items,
  });

  return response.data;
};
