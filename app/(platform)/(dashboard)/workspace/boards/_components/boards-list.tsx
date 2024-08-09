import { HelpCircle, User2 } from 'lucide-react';
import Link from 'next/link';

import { FormPopover } from '@/components/form/form-popover';
import { Hint } from '@/components/hint';
import { Skeleton } from '@/components/ui/skeleton';
import { headingFont } from '@/constants/fonts';
import { db } from '@/lib/db';
import { cn } from '@/lib/utils';

export const BoardsList = async () => {
  // Get the list of boards;
  const boards = await db.board.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <section className='space-y-4'>
      {/* heading */}
      <h2
        className={cn(
          'flex items-center gap-1 font-medium text-neutral-700',
          headingFont.className
        )}
      >
        <User2 className='w-5 h-5' />
        <span className='pt-0.5'>Your Boards</span>
      </h2>
      {/* Boards List */}
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/board/${board.id}`}
            className='group relative aspect-video bg-no-repeat bg-center bg-cover bg-sky-700/50 rounded-sm h-full w-full p-2 overflow-hidden'
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition' />
            <p className='relative font-semibold text-white'>{board.title}</p>
          </Link>
        ))}

        <FormPopover side='right' sideOffset={10}>
          <div
            role='button'
            className='aspect-video relative h-full w-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition'
          >
            <p className='text-sm'>Create new board</p>
            <span className='text-xs'>5 remaining</span>
            <Hint
              sideOffset={40}
              description='Free workspaces can have up to 5 open boards. For unlimited boards upgrade your workspace'
            >
              <HelpCircle className='absolute bottom-2 right-2 h-[14px] w-[14px]' />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </section>
  );
};

BoardsList.Skeleton = function BoardsListSkeleton() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
      <Skeleton className='aspect-video h-full w-full p-2' />
    </div>
  );
};
