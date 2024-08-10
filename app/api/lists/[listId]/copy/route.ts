import { NextResponse } from 'next/server';

import { ApiError } from '@/app/api/_utils/ApiError';
import { withErrorHandling } from '@/app/api/_utils/WithErrorHandling';
import { db } from '@/lib/db';

interface Params {
  params: { listId: string };
}

export const POST = withErrorHandling<Params>(async (req, params) => {
  const listId = params.params.listId;

  const listToCopy = await db.list.findUnique({
    where: {
      id: listId,
    },
    include: {
      cards: true,
    },
  });

  if (!listToCopy) throw new ApiError('List not found', 404);

  const lastList = await db.list.findFirst({
    where: {
      boardId: listToCopy.boardId,
    },
    orderBy: {
      order: 'desc',
    },
    select: {
      order: true,
    },
  });

  const newOrder = lastList ? lastList.order + 1 : 1;

  const newList = await db.list.create({
    data: {
      boardId: listToCopy.boardId,
      title: `${listToCopy.title} - Copy`,
      order: newOrder,
    },
  });

  const cardData = listToCopy.cards.map((card) => ({
    title: card.title,
    order: card.order,
    description: card.description,
    listId: newList.id, // Associate each card with the new list
  }));

  if (cardData.length > 0) {
    // Creating the cards
    await db.card.createMany({
      data: cardData,
    });
  }

  // Get the new list again with cards
  const newListWithCards = await db.list.findUnique({
    where: {
      id: newList.id,
    },
    include: {
      cards: true,
    },
  });

  return NextResponse.json({
    message: 'list created',
    newList: newListWithCards,
  });
});

export const PATCH = withErrorHandling<Params>(async (req, params) => {
  const listId = params.params.listId;
  const body = await req.json();

  const { title } = body;

  if (!title) {
    throw new ApiError('Missing title', 400);
  }

  const updatedList = await db.list.update({
    where: {
      id: listId,
    },
    data: {
      title,
    },
  });

  return NextResponse.json({
    message: 'List updated',
    updatedList,
  });
});
