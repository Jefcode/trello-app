'use client';

import { AlignLeft, Copy, Layout, Trash } from 'lucide-react';
import { PropsWithChildren } from 'react';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FormTextarea from '../form/form-textarea';
import { SubmitButton } from '../form/submit-button';

export const CardDetailsModal = ({ children }: PropsWithChildren) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className='w-[700px] max-w-[calc(100vw-50px)]'>
        <DialogTitle className='mb-8'>
          <div className='flex text-neutral-600 gap-x-3'>
            <Layout className='w-5 h-5 mt-1' />
            <div className='space-y-0.5'>
              <h2 className='font-semibold text-xl'>Dashboard Page</h2>

              {/* Subtitle */}
              <div className='text-sm text-neutral-400 font-normal'>
                In list <span className='underline'>Done - Copy</span>
              </div>
            </div>
          </div>
        </DialogTitle>
        {/* Descripion / Actions */}
        <div className='flex flex-col md:flex-row items-start gap-4'>
          {/* Description form */}
          <div className='w-full md:flex-1'>
            <div className='flex text-neutral-600 gap-x-3'>
              <AlignLeft className='w-5 h-5 mt-0.5' />
              <div className='space-y-1 w-full'>
                <h3 className='font-semibold mb-3 text-left'>Description</h3>

                <form>
                  <FormTextarea
                    className='w-full bg-neutral-100 rounded-none border-none h-20'
                    placeholder='Add a description here'
                  />
                </form>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className='flex-shrink-0 w-full md:w-40 pl-8 md:pl-0'>
            <p className='font-semibold mb-2 text-sm mt-2 text-neutral-700 text-left'>
              Actions
            </p>

            {/* Actions */}
            <div className='flex w-full md:flex-col gap-y-1 gap-x-2 text-neutral-700 text-sm'>
              <SubmitButton
                className='py-1.5 px-2 bg-neutral-100 hover:bg-neutral-100 border border-neutral-300 md:border-transparent hover:border-neutral-700 rounded-none flex-1'
                variant='ghost'
                size='sm'
              >
                <div className='text-left flex items-center gap-2'>
                  <Copy className='w-4 h-4' />
                  <span className='font-medium text-sm'>Copy</span>
                </div>
              </SubmitButton>
              <SubmitButton
                className='py-1.5 px-2 bg-neutral-100 hover:bg-neutral-100 border border-neutral-300 md:border-transparent hover:border-neutral-700 rounded-none flex-1'
                variant='ghost'
                size='sm'
              >
                <div className='text-left flex items-center gap-2'>
                  <Trash className='w-4 h-4' />
                  <span>Delete</span>
                </div>
              </SubmitButton>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
