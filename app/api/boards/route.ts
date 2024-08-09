import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { ApiError } from '../_utils/ApiError';
import { withErrorHandling } from '../_utils/WithErrorHandling';

export const POST = withErrorHandling(async (req) => {
  const body = await req.json();

  const { title, imageData } = body;

  if (!title || !imageData) {
    throw new ApiError(
      'Missing required fields. Either title or imageData is missing',
      400
    );
  }

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
    imageData.split('|');

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHtml ||
    !imageUserName
  ) {
    throw new ApiError(
      'The image data is corrupted. Please pass a correct imageData',
      400
    );
  }

  // Create Board
  const newBoard = await db.board.create({
    data: {
      title,
      imageId,
      imageFullUrl,
      imageThumbUrl,
      imageLinkHtml,
      imageUserName,
    },
  });

  return NextResponse.json({
    message: 'Board created successfully',
    board: newBoard,
  });
});
