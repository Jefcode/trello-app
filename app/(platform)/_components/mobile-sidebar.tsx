'use client';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';
import { Sidebar } from './sidebar';

export const MobileSidebar = () => {
  const pathname = usePathname();

  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onClose = useMobileSidebar((state) => state.onClose);
  const onOpen = useMobileSidebar((state) => state.onOpen);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <>
      <Button
        className='block md:hidden mr-2'
        onClick={onOpen}
        variant='ghost'
        size='sm'
      >
        <Menu className='w-4 h-4' />
      </Button>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side='left' className='p-2 pt-10'>
          <Sidebar />
        </SheetContent>
      </Sheet>
    </>
  );
};
