'use client';

import { Activity, Layout, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <>
      <div className='font-medium text-xs flex items-center mb-4'>
        <span className='text-neutral-500 pl-2'>Workspace</span>
      </div>
      <Accordion
        type='single'
        collapsible
        className='w-full space-y-2'
        defaultValue='default'
      >
        <AccordionItem value='default' className='border-none'>
          <AccordionTrigger className='flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline data-[state=closed]:bg-sky-500/10 data-[state=closed]:text-sky-700'>
            <div className='flex items-center gap-x-2'>
              <div className='h-7 w-7 relative bg-green-500 rounded-md'></div>
              <span className='font-medium text-sm'>Default Workspace</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className='pt-1 text-neutral-700'>
            <Button
              size='sm'
              className={cn(
                'w-full font-normal justify-start pl-10 mb-1',
                pathname === '/workspace/boards' && 'bg-sky-500/10 text-sky-700'
              )}
              variant='ghost'
            >
              <Link
                href='/workspace/boards'
                className='flex items-center gap-2'
              >
                <Layout className='w-4 h-4' />
                <span>Boards</span>
              </Link>
            </Button>

            <Button
              size='sm'
              className={cn(
                'w-full font-normal justify-start pl-10 mb-1',
                pathname === '/workspace/activity' &&
                  'bg-sky-500/10 text-sky-700'
              )}
              variant='ghost'
            >
              <Link
                href='/workspace/activity'
                className='flex items-center gap-2'
              >
                <Activity className='w-4 h-4' />
                <span>Activity</span>
              </Link>
            </Button>

            <Button
              size='sm'
              className={cn(
                'w-full font-normal justify-start pl-10 mb-1',
                pathname === '/workspace/settings' &&
                  'bg-sky-500/10 text-sky-700'
              )}
              variant='ghost'
            >
              <Link
                href='/workspace/settings'
                className='flex items-center gap-2'
              >
                <Settings className='w-4 h-4' />
                <span>Settings</span>
              </Link>
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};
