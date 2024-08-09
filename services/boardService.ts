import { axiosInstance } from '@/lib/axios';
import { Board } from '@prisma/client';

/**
 * All Services that have to do with boards
 */
export const createBoard = async ({
  title,
  imageData,
}: {
  title: string;
  imageData: string;
}): Promise<{ message: string; board: Board }> => {
  const response = await axiosInstance.post('/api/boards', {
    title,
    imageData,
  });
  return response.data;
};

export const updateBoardById = async ({
  id,
  title,
}: {
  id: string;
  title: string;
}) => {
  await axiosInstance.patch(`/api/boards/${id}`, {
    title,
  });
};
