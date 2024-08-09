import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

import { getBoardById } from '@/actions/board';
import { BoardNavbar } from './_components/board-navbar';

interface BoardDetailsLayoutProps extends PropsWithChildren {
  params: { boardId: string };
}

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const board = await getBoardById(params.boardId);

  if (!board) {
    return {
      title: '404 Not Found',
    };
  }

  return {
    title: board.title,
  };
}

export default async function BoardDetailsLayout({
  children,
  params,
}: BoardDetailsLayoutProps) {
  const board = await getBoardById(params.boardId);

  if (!board) {
    notFound();
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className='h-full bg-cover bg-center bg-no-repeat relative'
    >
      <BoardNavbar board={board} />

      <div className='absolute inset-0 bg-black/10'></div>

      <main className='relative pt-28 h-full'>{children}</main>
    </div>
  );
}
