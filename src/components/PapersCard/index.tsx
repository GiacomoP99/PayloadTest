'use client';

import type { DefBlock, Media } from '@/payload-types';
import { Download } from 'lucide-react';
import { useState } from 'react';
import RichText from '../RichText';
import { Button } from '../ui/button';
import { DownloadModal } from './DownloadModal';

interface PapersCardProps {
  flags?: string[];
  id: string;
  title: string;
  description?: NonNullable<DefBlock['baseBlockFields']>['description'];
  file?: Media;
  otherInfo?: {
    label: string;
    value: string | string[];
  }[];
}

const PapersCard = ({
  flags,
  id,
  title,
  description,
  file,
  otherInfo
}: PapersCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div key={id} className='flex flex-col gap-2 text-left'>
        <div className='flex flex-wrap gap-3'>
          {flags?.map(flag => (
            <div
              key={flag}
              className='h-[28px] w-[28px] content-center rounded-full border border-primary text-center text-primary text-xs'
            >
              {flag}
            </div>
          ))}
        </div>
        <div className='text-foreground text-h8 sm:text-h7'>{title}</div>
        {description && (
          <div className='col-span-2 line-clamp-6 text-foreground'>
            <RichText data={description} />
          </div>
        )}
        <div className='mt-4 flex flex-col gap-4 border-card border-t pt-4'>
          {otherInfo?.map(info => (
            <div key={info.label} className='flex flex-col gap-1'>
              <div className='line-clamp-3 text-primary text-small'>
                {info.label}:
              </div>
              {typeof info.value === 'string' ? (
                <div className='text-secondary text-xsmall'>{info.value}</div>
              ) : (
                info.value?.map(value => (
                  <div key={value} className='text-secondary text-xsmall'>
                    {value}
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
        {file && typeof file === 'object' && file.url && (
          <div className='mt-4'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => setIsModalOpen(true)}
              className='w-fit cursor-pointer gap-2 rounded-full border-0 bg-card text-primary'
            >
              <Download className='size-4' />
              Download PDF
            </Button>
          </div>
        )}
      </div>

      {file && typeof file === 'object' && file.url && (
        <DownloadModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          fileUrl={file.url}
          filename={file.filename || undefined}
          title={title}
        />
      )}
    </>
  );
};

export default PapersCard;
