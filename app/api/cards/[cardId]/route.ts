import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ApiError } from '../../_utils/ApiError';
import { withErrorHandling } from '../../_utils/WithErrorHandling';

interface Params {
  params: { cardId: string };
}

export const GET = withErrorHandling<Params>(async (req, { params }) => {
  const cardId = params.cardId;

  const card = await db.card.findUnique({
    where: {
      id: cardId,
    },
    include: {
      list: {
        select: {
          title: true,
        },
      },
    },
  });

  if (!card) {
    throw new ApiError('Card not found', 404);
  }

  return NextResponse.json({
    card,
  });
});

export const PATCH = withErrorHandling<Params>(async (req, { params }) => {
  const cardId = params.cardId;
  const body = await req.json();

  const { title, description } = body;

  console.log(body);

  if (!title) throw new ApiError('Missing required fields', 400);

  const updatedCard = await db.card.update({
    where: {
      id: cardId,
    },
    data: {
      title,
      description,
    },
  });

  return NextResponse.json({
    card: updatedCard,
  });
});

export const DELETE = withErrorHandling<Params>(async (req, { params }) => {
  const cardId = params.cardId;

  await db.card.delete({
    where: {
      id: cardId,
    },
  });

  return NextResponse.json({
    message: 'Deleted',
  });
});
