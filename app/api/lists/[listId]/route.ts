import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ApiError } from '../../_utils/ApiError';
import { withErrorHandling } from '../../_utils/WithErrorHandling';

interface Params {
  params: { listId: string };
}

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

export const DELETE = withErrorHandling<Params>(async (req, params) => {
  const listId = params.params.listId;

  await db.list.delete({
    where: {
      id: listId,
    },
  });

  return NextResponse.json({
    message: 'Deleted',
  });
});
