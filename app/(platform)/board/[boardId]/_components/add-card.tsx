import { revalidateBoard } from '@/actions/board';
import FormTextarea from '@/components/form/form-textarea';
import { SubmitButton } from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { titleSchema } from '@/schemas';
import { createCard } from '@/services/cardService';
import { zodResolver } from '@hookform/resolvers/zod';
import { List } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { Plus, X } from 'lucide-react';
import { ElementRef, KeyboardEventHandler, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { z } from 'zod';

type FormType = z.infer<typeof titleSchema>;

export const AddCard = ({ listData }: { listData: List }) => {
  const formRef = useRef<ElementRef<'form'>>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form
  const {
    handleSubmit,
    register,
    setFocus,
    formState: { errors },
    reset,
  } = useForm<FormType>({
    resolver: zodResolver(titleSchema),
  });

  /**
   * Mutation => Create Card
   */
  const createCardMutation = useMutation({
    mutationFn: createCard,
    onSuccess: (data) => {
      toast.success('Card Created');

      revalidateBoard(listData.boardId);

      reset();

      setFocus('title');
    },
  });

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      setFocus('title');
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') disableEditing();
  };

  const onSubmit = (formData: FormType) => {
    createCardMutation.mutate({ listId: listData.id, title: formData.title });
  };

  const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <form
        ref={formRef}
        className='m-1 py-0.5 px-1 space-y-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormTextarea
          onKeyDown={onTextareaKeyDown}
          placeholder='Enter a title for this card...'
          {...register('title')}
          error={errors.title}
        />

        {/* Actions */}
        <div className='flex items-center gap-x-1'>
          <SubmitButton loading={createCardMutation.isPending}>
            Add card
          </SubmitButton>
          <Button onClick={disableEditing} size='sm' variant='ghost'>
            <X className='w-5 h-5' />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className='px-2 pt-2'>
      <Button
        className='h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm'
        variant='ghost'
        size='sm'
        onClick={enableEditing}
      >
        <Plus className='w-4 h-4 mr-2' />
        Add a card
      </Button>
    </div>
  );
};
