'use client';

import { revalidateWorkspace } from '@/actions/board';
import Dropdown from '@/components/Dropdown';
import { Button } from '@/components/ui/button';
import { deleteBoardById } from '@/services/boardService';
import { useMutation } from '@tanstack/react-query';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const BoardOptions = ({ boardId }: { boardId: string }) => {
  const router = useRouter();

  const { mutate: deleteBoard, isPending } = useMutation({
    mutationFn: deleteBoardById,
    onSuccess: () => {
      revalidateWorkspace();

      router.replace('/workspace/boards');
    },
  });

  return (
    <Dropdown>
      <Dropdown.Button className='w-10 h-10 hover:bg-black/40 text-white hover:text-white p-2'>
        <MoreHorizontal className='w-6 h-6' />
      </Dropdown.Button>
      <Dropdown.Content title='Board actions' align='end'>
        <Button
          onClick={() => deleteBoard(boardId)}
          disabled={isPending}
          variant='ghost'
          className='rounded-none w-full h-auto p-2 justify-start px-5'
        >
          Delete board
        </Button>
      </Dropdown.Content>
    </Dropdown>
  );
};
