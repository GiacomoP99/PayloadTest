'use client';
import CarouselWrapper from '@/components/Carousel/CarouselWrapper';
import RichText from '@/components/RichText';
import { Button } from '@/components/ui/button';
import type {
  Patented,
  PatentSectionBlock as PatentSectionBlockProps
} from '@/payload-types';
import { Download } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';

export const TECHNOLOGIES = {
  INIDS: 'Intelligent Network Intrusion Detection Systems',
  MDL: 'Machine and Deep Learning',
  AD: 'Anomaly detection'
};
export const DOMAINS = {
  CS: 'Cybersecurity'
};

export const PatentSectionBlock: React.FC<PatentSectionBlockProps> = props => {
  // @ts-expect-error
  const patents: Patented[] = props.patents ?? [];
  return (
    <div className='px-9'>
      <CarouselWrapper
        maxElementsPerPage={3}
        elements={patents.map(element => (
          <div key={element.id} className='flex flex-col gap-2 text-left'>
            <div className='flex flex-wrap gap-3'>
              {element.flags?.map(flag => (
                <div
                  key={flag}
                  className='h-[28px] w-[28px] content-center rounded-full border border-primary text-center text-primary text-xs'
                >
                  {flag}
                </div>
              ))}
            </div>
            <div className='text-foreground text-h8'>{element.title}</div>
            {element.description && (
              <div className='col-span-2 text-foreground text-xsmall'>
                <RichText data={element.description} />
              </div>
            )}
            <div className='mt-4 flex flex-col gap-4 border-card border-t pt-4'>
              <div className='flex flex-col gap-1'>
                <div className='text-primary text-small'>Granted Patent:</div>
                <div className='text-secondary text-xsmall'>
                  {element.granted}
                </div>
              </div>
              <div className='flex min-h-[100px] flex-col gap-1'>
                <div className='text-primary text-small'>Technologies:</div>
                {element.techonlogies?.map(tec => (
                  <div key={tec} className='text-secondary text-xsmall'>
                    {TECHNOLOGIES[tec as keyof typeof TECHNOLOGIES]}
                  </div>
                ))}
              </div>
              <div className='flex flex-col gap-1'>
                <div className='text-primary text-small'>
                  Application domain:
                </div>
                <div className='text-secondary text-xsmall'>
                  {DOMAINS[element.appDomain as keyof typeof DOMAINS]}
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='text-primary text-small'>Application year:</div>
                <div className='text-secondary text-xsmall'>
                  {element.applicationYear}
                </div>
              </div>
            </div>
            {element.file &&
              typeof element.file === 'object' &&
              element.file.url && (
                <div className='mt-4'>
                  <Button
                    variant='outline'
                    size='sm'
                    asChild
                    className='w-fit gap-2 rounded-full border-0 bg-card text-primary'
                  >
                    <Link
                      href={element.file.url}
                      download={element.file.filename || undefined}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Download className='size-4' />
                      Download PDF
                    </Link>
                  </Button>
                </div>
              )}
          </div>
        ))}
      />
    </div>
  );
};
