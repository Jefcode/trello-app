'use server';

import { db } from '@/lib/db';
import { ObjectId } from 'bson';
import { revalidatePath } from 'next/cache';

export const getBoardById = async (boardId: string) => {
  if (!ObjectId.isValid(boardId)) {
    return null;
  }

  const board = await db.board.findFirst({
    where: {
      id: boardId,
    },
  });

  return board;
};

export const revalidateBoardPath = (path: string) => {
  revalidatePath(path);
};
