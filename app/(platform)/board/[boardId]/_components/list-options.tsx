'use client';

import { List } from '@prisma/client';

import Dropdown from '@/components/Dropdown';
import { SubmitButton } from '@/components/form/submit-button';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MoreHorizontal } from 'lucide-react';
import { ListOptionsActions } from './list-options-actions';

interface ListOptionsProps {
  listData: List;
  onAddCard: () => void;
}

export const ListOptions = ({ listData, onAddCard }: ListOptionsProps) => {
  return (
    <Dropdown>
      <Dropdown.Button>
        <MoreHorizontal className='w-4 h-4' />
      </Dropdown.Button>

      <Dropdown.Content title='List actions'>
        {/* Copy | Delete Actions */}
        <ListOptionsActions listData={listData} />
      </Dropdown.Content>
    </Dropdown>
  );
};
