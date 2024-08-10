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
    console.log(bodyRaw);
    body = schema.parse(bodyRaw);
  } catch (error) {
    throw new ApiError('items is not an array of lists');
  }

  const { items } = body;

  const transaction = items.map((list) =>
    db.list.update({
      where: {
        id: list.id,
      },
      data: {
        order: list.order,
      },
    })
  );

  const lists = await db.$transaction(transaction);

  return NextResponse.json({
    message: 'Lists reordered',
    lists,
  });
});
