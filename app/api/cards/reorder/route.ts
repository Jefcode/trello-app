import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { ApiError } from '../../_utils/ApiError';
import { withErrorHandling } from '../../_utils/WithErrorHandling';

const schema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
  ),
});

type BodyType = z.infer<typeof schema>;

export const PATCH = withErrorHandling(async (req, params) => {
  const bodyRaw = await req.json();

  let body: BodyType;

  try {
    body = schema.parse(bodyRaw);
  } catch (error) {
    throw new ApiError('items is not an array of cards', 400);
  }

  const { items } = body;

  const transaction = items.map((card) =>
    db.card.update({
      where: {
        id: card.id,
      },
      data: {
        order: card.order,
        listId: card.listId,
      },
    })
  );

  const cards = await db.$transaction(transaction);

  return NextResponse.json({
    message: 'cards reordered',
    cards,
  });
});
