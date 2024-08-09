/* eslint-disable @next/next/no-img-element */
'use client';

import { Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FieldError } from 'react-hook-form';

import { defaultImages } from '@/constants/images';
import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';

import { Spinner } from '../spinner';

interface FormPickerProps {
  onChange: (imageData: string) => void;

  pending?: boolean;
  error?: FieldError;
}

export const FormPicker = ({
  pending = false,
  onChange,
  error,
}: FormPickerProps) => {
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  // Fetch the images
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });

        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.error('Failed to get images from unsplash. try using a vpn');
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className='p-6 flex items-center justify-center'>
        <Spinner className='text-sky-600 w-6 h-6' />
      </div>
    );
  }

  return (
    <div className='relative'>
      <div className='grid grid-cols-3 gap-2 mb-2'>
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted overflow-hidden rounded-sm',
              pending && 'opacity-50 hover:opacity-50 cursor-auto'
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);

              // Embed the image data into a string to be saved in the database
              onChange(
                `${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`
              );
            }}
          >
            {/* This does not work due to sanctions */}
            {/* <Image
              alt='Unsplash Image'
              fill
              className='object-cover rounded-sm'
              src={image.urls.thumb}
            /> */}

            <img
              src={image.urls.thumb}
              alt='Unsplash image'
              className='w-full h-full object-cover'
            />

            <Link
              href={image.links.html}
              target='_blank'
              className='opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white hover:underline p-1 bg-black/50'
            >
              {image.user.name}
            </Link>

            {/* Check indicator */}
            {selectedImageId === image.id && (
              <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
                <Check className='w-4 h-4 text-white' />
              </div>
            )}
          </div>
        ))}
      </div>

      {error && <p className='text-xs text-rose-500'>{error.message}</p>}
    </div>
  );
};
