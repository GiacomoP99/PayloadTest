'use client';
import { Media } from '@/components/Media';
import { useResponsive } from '@/hooks/useResponsive';
import type { ComposableBlock as ComposableBlockProps } from '@/payload-types';
import { cn } from '@/utilities/ui';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { RenderComposable } from '../RenderComposable';

const ComposableBlock = (props: ComposableBlockProps) => {
  const { sm } = useResponsive();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '100px' });
  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return '-top-[350px] left-0';
      case 'top-right':
        return '-top-[350px] right-0';
      case 'bottom-left':
        return '-bottom-[350px] left-0';
      case 'bottom-right':
        return '-bottom-[350px] right-0';
      default:
        return 'top-0 left-0';
    }
  };

  const getAnimationDirection = (position: string) => {
    switch (position) {
      case 'top-left':
        return { x: -200, y: -200 };
      case 'top-right':
        return { x: 200, y: -200 };
      case 'bottom-left':
        return { x: -200, y: 200 };
      case 'bottom-right':
        return { x: 200, y: 200 };
      default:
        return { x: -200, y: -200 };
    }
  };

  return (
    <div ref={ref} className='relative'>
      {/* Background Images */}
      {props.backgroundImages?.map((bgImage, index) => {
        const positionClasses = getPositionClasses(bgImage.imagePosition || '');
        const animationDirection = getAnimationDirection(
          bgImage.imagePosition || ''
        );

        return (
          <motion.div
            key={bgImage.id || index}
            className={cn('absolute z-0 h-[550px] w-fit', positionClasses)}
            initial={{
              opacity: 0,
              x: animationDirection.x,
              y: animationDirection.y,
              scale: 0.8
            }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1
                  }
                : {
                    opacity: 0,
                    x: animationDirection.x,
                    y: animationDirection.y,
                    scale: 0.8
                  }
            }
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease: 'easeOut'
            }}
          >
            <Media
              resource={bgImage.image}
              className='h-full w-fit object-contain'
              imgClassName='h-full w-fit object-contain'
            />
          </motion.div>
        );
      })}

      {/* Main Content */}
      <div
        className={cn('container relative z-10 mx-auto gap-6 px-9', {
          'grid grid-cols-3': props.columns === 3 && !sm,
          'grid grid-cols-2': props.columns === 2 && !sm,
          'flex flex-col': sm || props.columns === 1,
          'mb-[350px]': props.backgroundImages?.some(
            bgImage =>
              bgImage.imagePosition === 'bottom-left' ||
              bgImage.imagePosition === 'bottom-right'
          ),
          'mt-[350px]': props.backgroundImages?.some(
            bgImage =>
              bgImage.imagePosition === 'top-left' ||
              bgImage.imagePosition === 'top-right'
          )
        })}
      >
        {props.content?.map(content => (
          <div
            key={content.id}
            className={`col-span-${content.columnsSpan} my-6 text-left`}
          >
            <RenderComposable
              blocks={content.block || []}
              ovverideClassNames='mb-6'
              bgColor={props.themeColor || 'background'}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComposableBlock;
