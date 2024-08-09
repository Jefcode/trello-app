'use client';

import { revalidateBoardPath } from '@/actions/board';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { deleteBoardById } from '@/services/boardService';
import { useMutation } from '@tanstack/react-query';
import { MoreHorizontal, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BoardOptions = ({ boardId }: { boardId: string }) => {
  const router = useRouter();

  const { mutate: deleteBoard, isPending } = useMutation({
    mutationFn: deleteBoardById,
    onSuccess: () => {
      revalidateBoardPath('/workspace/boards');

      router.replace('/workspace/boards');
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          className='w-10 h-10 hover:bg-black/40 text-white hover:text-white p-2'
        >
          <MoreHorizontal className='w-6 h-6' />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        side='bottom'
        align='end'
        className='w-52'
        sideOffset={10}
      >
        <div className='text-sm font-medium text-center text-neutral-600 pb-2'>
          Board actions
        </div>

        <Separator className='mb-2' />

        <PopoverClose asChild>
          <Button
            className='h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600'
            variant='ghost'
          >
            <X className='w-4 h-4' />
          </Button>
        </PopoverClose>

        <Button
          onClick={() => deleteBoard(boardId)}
          disabled={isPending}
          variant='ghost'
          className='rounded-none w-full h-auto p-2 px-5 justify-start'
        >
          Delete board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
