import { axiosInstance } from '@/lib/axios';

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
