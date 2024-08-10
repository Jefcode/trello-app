import { revalidateBoard } from '@/actions/board';
import { useDropdown } from '@/components/Dropdown';
import { SubmitButton } from '@/components/form/submit-button';
import { Separator } from '@/components/ui/separator';
import { deleteListById } from '@/services/listService';
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

      console.log(listData.boardId);
      revalidateBoard(listData.boardId);

      closeDropdown();
    },
  });

  return (
    <>
      <SubmitButton
        className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'
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
