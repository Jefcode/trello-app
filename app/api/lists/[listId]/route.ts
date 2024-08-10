import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ApiError } from '../../_utils/ApiError';
import { withErrorHandling } from '../../_utils/WithErrorHandling';

export const PATCH = withErrorHandling<{ params: { listId: string } }>(
  async (req, params) => {
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
  }
);
