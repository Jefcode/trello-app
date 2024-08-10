import { revalidateBoard } from '@/actions/board';
import { useDropdown } from '@/components/Dropdown';
import { SubmitButton } from '@/components/form/submit-button';
import { Separator } from '@/components/ui/separator';
import { copyListById, deleteListById } from '@/services/listService';
import { List } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface ListOptionsActionsProps {
  listData: List;
}

export const ListOptionsActions = ({ listData }: ListOptionsActionsProps) => {
  const { close: closeDropdown } = useDropdown();

  /**
   * Delete mutation
   */
  const deleteMutation = useMutation({
    mutationFn: deleteListById,
    onSuccess: () => {
      toast.success(`list "${listData.title}" was deleted`);
      revalidateBoard(listData.boardId);

      closeDropdown();
    },
  });

  /**
   * Copy list mutation
   */
  const copyListMutation = useMutation({
    mutationFn: copyListById,
    onSuccess: (data) => {
      const newListTitle = data.newList.title;

      toast.success(`list "${newListTitle}" was copied`);

      revalidateBoard(listData.boardId);

      closeDropdown();
    },
  });

  return (
    <>
      <SubmitButton
        onClick={() => copyListMutation.mutate(listData.id)}
        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
        loading={copyListMutation.isPending}
        variant='ghost'
      >
        Copy list
      </SubmitButton>

      <Separator />

      <SubmitButton
        onClick={() => deleteMutation.mutate(listData.id)}
        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
        loading={deleteMutation.isPending}
        variant='ghost'
      >
        Delete this list
      </SubmitButton>
    </>
  );
};
