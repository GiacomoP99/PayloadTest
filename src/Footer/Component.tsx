import { RenderBlocks } from '@/blocks/RenderBlocks';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { cn } from '@/utilities/ui';
import configPromise from '@payload-config';
import Link from 'next/link';
import { getPayload } from 'payload';
import './index.scss';

const socialIcons = {
  facebook: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      viewBox='0 0 256 256'
      className='object-contain'
    >
      <path
        fill='#1877f2'
        d='M256 128C256 57.3 198.7 0 128 0S0 57.3 0 128c0 63.9 46.8 116.8 108 126.4V165H75.5v-37H108V99.8C108 67.7 127.1 50 156.3 50C170.4 50 185 52.5 185 52.5V84h-16.1C153 84 148 93.9 148 104V128h35.5l-5.7 37H148v89.4C209.2 244.8 256 191.9 256 128'
      />
      <path
        fill='#fff'
        d='M177.8 165l5.7-37H148v-24c0-10.1 5-20 20.9-20H185V52.5S170.4 50 156.3 50C127.1 50 108 67.7 108 99.8V128H75.5v37H108v89.4A129 129 0 0 0 128 256a129 129 0 0 0 20-1.6V165z'
      />
    </svg>
  ),
  linkedin: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 256 256'
    >
      <g fill='none'>
        <rect width='256' height='256' fill='#fff' rx='60' />
        <rect width='256' height='256' fill='#0a66c2' rx='60' />
        <path
          fill='#fff'
          d='M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4'
        />
      </g>
    </svg>
  ),
  youtube: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 256 180'
    >
      <path
        fill='#f00'
        d='M250.346 28.075A32.18 32.18 0 0 0 227.69 5.418C207.824 0 127.87 0 127.87 0S47.912.164 28.046 5.582A32.18 32.18 0 0 0 5.39 28.24c-6.009 35.298-8.34 89.084.165 122.97a32.18 32.18 0 0 0 22.656 22.657c19.866 5.418 99.822 5.418 99.822 5.418s79.955 0 99.82-5.418a32.18 32.18 0 0 0 22.657-22.657c6.338-35.348 8.291-89.1-.164-123.134'
      />
      <path fill='#fff' d='m102.421 128.06l66.328-38.418l-66.328-38.418z' />
    </svg>
  ),
  twitter: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 256 209'
    >
      <path
        fill='#55acee'
        d='M256 25.45a105 105 0 0 1-30.166 8.27c10.845-6.5 19.172-16.793 23.093-29.057a105.2 105.2 0 0 1-33.351 12.745C205.995 7.201 192.346.822 177.239.822c-29.006 0-52.523 23.516-52.523 52.52c0 4.117.465 8.125 1.36 11.97c-43.65-2.191-82.35-23.1-108.255-54.876c-4.52 7.757-7.11 16.78-7.11 26.404c0 18.222 9.273 34.297 23.365 43.716a52.3 52.3 0 0 1-23.79-6.57q-.004.33-.003.661c0 25.447 18.104 46.675 42.13 51.5a52.6 52.6 0 0 1-23.718.9c6.683 20.866 26.08 36.05 49.062 36.475c-17.975 14.086-40.622 22.483-65.228 22.483c-4.24 0-8.42-.249-12.529-.734c23.243 14.902 50.85 23.597 80.51 23.597c96.607 0 149.434-80.031 149.434-149.435q0-3.417-.152-6.795A106.8 106.8 0 0 0 256 25.45'
      />
    </svg>
  ),
  instagram: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 256 256'
    >
      <g fill='none'>
        <rect width='256' height='256' fill='url(#SVGWRUqebek)' rx='60' />
        <rect width='256' height='256' fill='url(#SVGfkNpldMH)' rx='60' />
        <path
          fill='#fff'
          d='M128.009 28c-27.158 0-30.567.119-41.233.604c-10.646.488-17.913 2.173-24.271 4.646c-6.578 2.554-12.157 5.971-17.715 11.531c-5.563 5.559-8.98 11.138-11.542 17.713c-2.48 6.36-4.167 13.63-4.646 24.271c-.477 10.667-.602 14.077-.602 41.236s.12 30.557.604 41.223c.49 10.646 2.175 17.913 4.646 24.271c2.556 6.578 5.973 12.157 11.533 17.715c5.557 5.563 11.136 8.988 17.709 11.542c6.363 2.473 13.631 4.158 24.275 4.646c10.667.485 14.073.604 41.23.604c27.161 0 30.559-.119 41.225-.604c10.646-.488 17.921-2.173 24.284-4.646c6.575-2.554 12.146-5.979 17.702-11.542c5.563-5.558 8.979-11.137 11.542-17.712c2.458-6.361 4.146-13.63 4.646-24.272c.479-10.666.604-14.066.604-41.225s-.125-30.567-.604-41.234c-.5-10.646-2.188-17.912-4.646-24.27c-2.563-6.578-5.979-12.157-11.542-17.716c-5.562-5.562-11.125-8.979-17.708-11.53c-6.375-2.474-13.646-4.16-24.292-4.647c-10.667-.485-14.063-.604-41.23-.604zm-8.971 18.021c2.663-.004 5.634 0 8.971 0c26.701 0 29.865.096 40.409.575c9.75.446 15.042 2.075 18.567 3.444c4.667 1.812 7.994 3.979 11.492 7.48c3.5 3.5 5.666 6.833 7.483 11.5c1.369 3.52 3 8.812 3.444 18.562c.479 10.542.583 13.708.583 40.396s-.104 29.855-.583 40.396c-.446 9.75-2.075 15.042-3.444 18.563c-1.812 4.667-3.983 7.99-7.483 11.488c-3.5 3.5-6.823 5.666-11.492 7.479c-3.521 1.375-8.817 3-18.567 3.446c-10.542.479-13.708.583-40.409.583c-26.702 0-29.867-.104-40.408-.583c-9.75-.45-15.042-2.079-18.57-3.448c-4.666-1.813-8-3.979-11.5-7.479s-5.666-6.825-7.483-11.494c-1.369-3.521-3-8.813-3.444-18.563c-.479-10.542-.575-13.708-.575-40.413s.096-29.854.575-40.396c.446-9.75 2.075-15.042 3.444-18.567c1.813-4.667 3.983-8 7.484-11.5s6.833-5.667 11.5-7.483c3.525-1.375 8.819-3 18.569-3.448c9.225-.417 12.8-.542 31.437-.563zm62.351 16.604c-6.625 0-12 5.37-12 11.996c0 6.625 5.375 12 12 12s12-5.375 12-12s-5.375-12-12-12zm-53.38 14.021c-28.36 0-51.354 22.994-51.354 51.355s22.994 51.344 51.354 51.344c28.361 0 51.347-22.983 51.347-51.344c0-28.36-22.988-51.355-51.349-51.355zm0 18.021c18.409 0 33.334 14.923 33.334 33.334c0 18.409-14.925 33.334-33.334 33.334s-33.333-14.925-33.333-33.334c0-18.411 14.923-33.334 33.333-33.334'
        />
        <defs>
          <radialGradient
            id='SVGWRUqebek'
            cx='0'
            cy='0'
            r='1'
            gradientTransform='matrix(0 -253.715 235.975 0 68 275.717)'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#fd5' />
            <stop offset='.1' stopColor='#fd5' />
            <stop offset='.5' stopColor='#ff543e' />
            <stop offset='1' stopColor='#c837ab' />
          </radialGradient>
          <radialGradient
            id='SVGfkNpldMH'
            cx='0'
            cy='0'
            r='1'
            gradientTransform='matrix(22.25952 111.2061 -458.39518 91.75449 -42.881 18.441)'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#3771c8' />
            <stop offset='.128' stopColor='#3771c8' />
            <stop offset='1' stopColor='#60f' stopOpacity='0' />
          </radialGradient>
        </defs>
      </g>
    </svg>
  )
};

export async function FooterComponent({
  tenant,
  lang,
  className
}: {
  tenant: string;
  lang: string;
  className?: string;
}) {
 
  const payload = await getPayload({ config: configPromise });
  const footerData = await payload.find({
    collection: 'footers',
    limit: 1,
    pagination: false,
    where: {
      tenant: {
        equals: tenant
      }
    }
  }).then(res => res.docs[0]);

  const blocks = footerData?.blocks || [];
  const navItems = footerData?.footerItems || [];

  return (
    <div className={className}>
      <div className='text-foreground'>
        <RenderBlocks blocks={blocks} />
      </div>
      <div className='flex flex-col bg-accent p-20 pt-28 text-accent-foreground'>
        <div className='container mx-auto flex flex-col items-center space-y-6 sm:flex-row sm:justify-between sm:space-y-0'>
          {footerData?.logo && (
            <Media resource={footerData?.logo} className='h-auto w-48' />
          )}
          <div className='flex items-center gap-2'>
            {footerData?.socials?.map(social => (
              <Link
                key={social.id}
                href={social.link || ''}
                target={social.link ? '_blank' : undefined}
                rel={social.link ? 'noopener noreferrer' : undefined}
              >
                {socialIcons[social.icon as keyof typeof socialIcons]}
              </Link>
            ))}
          </div>
        </div>
        <div
          className={cn('container mx-auto mt-24 grid grid-cols-1 gap-24', {
            'sm:grid-cols-1': footerData?.footerItems?.length === 0,
            'sm:grid-cols-2': footerData?.footerItems?.length === 1,
            'sm:grid-cols-3': footerData?.footerItems?.length === 2,
            'sm:grid-cols-4': footerData?.footerItems?.length === 3,
            'sm:grid-cols-5': footerData?.footerItems?.length === 4
          })}
        >
          <div>
            {footerData?.description && (
              <div className='text-accent-foreground'>
                <RichText
                  data={footerData.description}
                  className='text-xsmall'
                />
              </div>
            )}
          </div>
          {navItems.map(item => (
            <div key={item.id} className='hidden gap-4 sm:flex sm:flex-col'>
              <div className='text-accent-foreground'>{item.column.label}</div>
              <div className='flex flex-col gap-4 text-accent-foreground'>
                {item.column.links?.map(link => (
                  <div
                    key={link.id}
                    className='text-accent-foreground text-xsmall'
                  >
                    <CMSLink {...link.link} appearance='inline' />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Accordion
            type='single'
            collapsible
            className='flex flex-col gap-4 sm:hidden'
          >
            {navItems.map(item => (
              <AccordionItem value={item.id ?? ''} key={item.id}>
                <AccordionTrigger className='text-accent-foreground'>
                  {item.column.label}
                </AccordionTrigger>
                <AccordionContent className='flex flex-col gap-4 text-accent-foreground'>
                  {item.column.links?.map(link => (
                    <div
                      key={link.id}
                      className='text-accent-foreground text-xsmall'
                    >
                      <CMSLink {...link.link} appearance='inline' />
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <div className='border-primary border-t bg-accent'>
        <div className='container mx-auto flex flex-col justify-between p-6 px-6 text-center text-accent-foreground sm:flex-row sm:text-left'>
          <div className='flex flex-wrap justify-center divide-x text-xsmall md:justify-start'>
            {footerData?.bottomLeft?.map(item => (
              <div key={item.id} className='px-4'>
                {item.label}
              </div>
            ))}
          </div>
          <div className='flex flex-wrap justify-center divide-x text-xsmall md:justify-start'>
            {footerData?.bottomRight?.map(link => (
              <div key={link.id} className='px-4 text-accent-foreground'>
                <CMSLink {...link.link} appearance='inline' />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
