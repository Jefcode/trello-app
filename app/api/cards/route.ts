import { NextResponse } from 'next/server';

import { db } from '@/lib/db';
import { ApiError } from '../_utils/ApiError';
import { withErrorHandling } from '../_utils/WithErrorHandling';

export const POST = withErrorHandling(async (req) => {
  const body = await req.json();

  const { listId, title } = body;

  if (!listId || !title) {
    throw new ApiError('Missing required fields', 400);
  }

  const list = await db.list.findUnique({
    where: {
      id: listId,
    },
  });

  if (!list) throw new ApiError('List not found', 404);

  const lastCard = await db.card.findFirst({
    where: { listId },
    orderBy: { order: 'desc' },
    select: { order: true },
  });

  const newOrder = lastCard ? lastCard.order + 1 : 1;

  const card = await db.card.create({
    data: {
      listId,
      title,
      order: newOrder,
    },
  });

  return NextResponse.json({
    message: 'Card created',
    card,
  });
});
