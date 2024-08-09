'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const getBoardById = async (boardId: string) => {
  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  return board;
};

export const revalidateBoard = (boardId: string) => {
  revalidatePath(`/board/${boardId}`);
};

export const revalidateWorkspace = () => {
  revalidatePath('/workspace/boards');
};
