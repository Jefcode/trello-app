import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { ApiError } from '../_utils/ApiError';
import { withErrorHandling } from '../_utils/WithErrorHandling';

export const POST = withErrorHandling(async (req) => {
  const body = await req.json();

  const { boardId, title } = body;

  if (!boardId || !title) {
    throw new ApiError('Missing required fields', 400);
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
    },
  });

  if (!board) {
    throw new ApiError('Board not found', 404);
  }

  const lastList = await db.list.findFirst({
    where: {
      boardId,
    },
    orderBy: {
      order: 'desc',
    },
    select: {
      order: true,
    },
  });

  const newOrder = lastList ? lastList.order + 1 : 1;

  const list = await db.list.create({
    data: {
      title,
      boardId,
      order: newOrder,
    },
  });

  return NextResponse.json({
    message: 'list created',
    list,
  });
});
