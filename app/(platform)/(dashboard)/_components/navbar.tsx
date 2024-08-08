import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { Plus } from 'lucide-react';
import { MobileSidebar } from './mobile-sidebar';

export const Navbar = () => {
  return (
    <nav className='fixed z-50 top-0 px-4 w-full h-14 border-b shadow-sm bg-white flex items-center'>
      <MobileSidebar />

      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
          <Logo />
        </div>
        <Button
          size='sm'
          className='rounded-sm h-auto py-1.5 px-2'
          variant='primary'
        >
          <span className='hidden md:block '>Create</span>

          <Plus className='w-4 h-4 block md:hidden' />
        </Button>
      </div>

      <div className='ml-auto flex items-center gap-x-2'>
        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: 23,
                height: 23,
              },
            },
          }}
        />
      </div>
    </nav>
  );
};
