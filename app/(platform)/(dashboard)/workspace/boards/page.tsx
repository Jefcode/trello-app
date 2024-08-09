import { Separator } from '@/components/ui/separator';
import { headingFont } from '@/constants/fonts';
import { cn } from '@/lib/utils';
import { LockKeyhole } from 'lucide-react';
import { Suspense } from 'react';
import { BoardsList } from './_components/boards-list';

const BoardsPage = async () => {
  return (
    <div className=''>
      {/* Info */}
      <div className='flex items-center gap-4 mb-5'>
        {/* Badge */}
        <div className='h-16 w-16 relative bg-gradient-to-b from-green-400/80 to-green-600 rounded-md text-neutral-700 flex items-center justify-center'>
          <span className='text-4xl font-medium'>D</span>
        </div>

        <div>
          <h2
            className={cn('font-bold text-neutral-700', headingFont.className)}
          >
            Default Workspace
          </h2>

          <div className='flex items-center gap-1 text-xs text-neutral-500'>
            <LockKeyhole className='w-3.5 h-3.5' />
            <span>private</span>
          </div>
        </div>
      </div>

      <Separator className='mb-5' />

      {/* Boards Section */}
      <Suspense fallback={<BoardsList.Skeleton />}>
        <BoardsList />
      </Suspense>
    </div>
  );
};

export default BoardsPage;
