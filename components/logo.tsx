import { headingFont } from '@/constants/fonts';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href='/'>
      <div className='hover:opacity-75 transition items-center gap-x-2 hidden md:flex'>
        <Image
          src='/logo.svg'
          alt='Logo'
          height={30}
          width={30}
          className='w-6 h-6'
        />
        <p
          className={cn('text-lg text-neutral-700 pt-1', headingFont.className)}
        >
          Trello
        </p>
      </div>
    </Link>
  );
};

export default Logo;
