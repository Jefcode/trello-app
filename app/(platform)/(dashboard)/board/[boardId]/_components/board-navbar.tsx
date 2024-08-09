import { Board } from '@prisma/client';
import { BoardOptions } from './board-options';
import { BoardTitleForm } from './board-title-form';

interface BoardNavbarProps {
  board: Board;
}

export const BoardNavbar = async ({ board }: BoardNavbarProps) => {
  return (
    <div className='w-full h-14 z-[30] bg-black/50 fixed top-14 flex items-center px-4 gap-x-4 text-white'>
      <BoardTitleForm board={board} />

      <div className='ml-auto'>
        <BoardOptions boardId={board.id} />
      </div>
    </div>
  );
};
