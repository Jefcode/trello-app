import { NextResponse } from 'next/server';

import { ApiError } from '@/app/api/_utils/ApiError';
import { withErrorHandling } from '@/app/api/_utils/WithErrorHandling';
import { db } from '@/lib/db';

interface Params {
  params: { cardId: string };
}

export const POST = withErrorHandling<Params>(async (req, { params }) => {
  const cardId = params.cardId;

  const cardToCopy = await db.card.findUnique({
    where: {
      id: cardId,
    },
  });

  if (!cardToCopy) throw new ApiError('List not found', 404);

  const lastCard = await db.card.findFirst({
    where: {
      listId: cardToCopy.listId,
    },
    orderBy: {
      order: 'desc',
    },
    select: {
      order: true,
    },
  });

  const newOrder = lastCard ? lastCard.order + 1 : 1;

  const newCard = await db.card.create({
    data: {
      listId: cardToCopy.listId,
      title: `${cardToCopy.title} - Copy`,
      order: newOrder,
    },
  });

  return NextResponse.json({
    card: newCard,
  });
});
