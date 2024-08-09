import { db } from '@/lib/db';
import { ObjectId } from 'bson';
import { ApiError } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';
import { withErrorHandling } from '../../_utils/WithErrorHandling';

type Params = { params: { boardId: string } };

export const PATCH = withErrorHandling<Params>(async (req, params) => {
  const boardId = params.params.boardId;
  const body = await req.json();
  const { title } = body;

  if (!ObjectId.isValid) {
    throw new ApiError(400, 'Please enter a valid id');
  }

  if (!title) {
    throw new ApiError(400, 'Missing required fields');
  }

  await db.board.update({
    where: {
      id: boardId,
    },
    data: {
      title,
    },
  });

  return NextResponse.json({
    message: 'Updated',
  });
});

export const DELETE = withErrorHandling<Params>(async (req, params) => {
  const boardId = params.params.boardId;

  await db.board.delete({
    where: {
      id: boardId,
    },
  });

  return NextResponse.json({
    message: 'Deleted',
  });
});
