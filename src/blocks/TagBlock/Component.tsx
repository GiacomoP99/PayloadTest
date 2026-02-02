import Tag from '@/components/Tag';
import type { Tags as TagBlockProps } from '@/payload-types';
import { cn } from '@/utilities/ui';

const TagBlock = (props: TagBlockProps) => {
  // const ref = useRef(null);
  // const isInView = useInView(ref, { once: false, margin: '100px' });

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1,
  //       delayChildren: 0.2
  //     }
  //   }
  // };

  // const tagVariants = (index: number): Variants => ({
  //   hidden: {
  //     opacity: 0,
  //     x: index % 2 === 0 ? -500 : 500,
  //     scale: 0.8
  //   },
  //   visible: {
  //     opacity: 1,
  //     x: 0,
  //     scale: 1,
  //     transition: {
  //       duration: 1.6,
  //       ease: 'easeOut'
  //     }
  //   }
  // });

  return (
    <div
      className={cn(
        `flex ${props.orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'} gap-4`,
        {
          'items-center justify-center': props.align === 'center',
          'justify-start': props.align === 'left',
          'justify-end': props.align === 'right'
        }
      )}
    >
      {props.tags?.map(tag => (
        <Tag
          key={tag.id}
          label={tag.label}
          id={tag.id ?? ''}
          size={props.size}
          style={props.style}
        />
      ))}
    </div>
  );

  // return props.animation?.includes('entrance') ? (
  //   <motion.div
  //     ref={ref}
  //     variants={containerVariants}
  //     initial='hidden'
  //     animate={isInView ? 'visible' : 'hidden'}
  //     className={cn(
  //       `flex ${props.orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'} gap-4`,
  //       {
  //         'items-center justify-center': props.align === 'center',
  //         'justify-start': props.align === 'left',
  //         'justify-end': props.align === 'right'
  //       }
  //     )}
  //   >
  //     {props.tags?.map((tag, index) => (
  //       <motion.div key={tag.id} variants={tagVariants(index)}>
  //         <Tag
  //           label={tag.label}
  //           id={tag.id ?? ''}
  //           size={props.size}
  //           style={props.style}
  //           animation={props.animation ?? []}
  //         />
  //       </motion.div>
  //     ))}
  //   </motion.div>
  // ) : (
  //   <div
  //     className={cn(
  //       `flex ${props.orientation === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col'} gap-4`,
  //       {
  //         'items-center justify-center': props.align === 'center',
  //         'justify-start': props.align === 'left',
  //         'justify-end': props.align === 'right'
  //       }
  //     )}
  //   >
  //     {props.tags?.map(tag => (
  //       <Tag
  //         key={tag.id}
  //         label={tag.label}
  //         id={tag.id ?? ''}
  //         size={props.size}
  //         style={props.style}
  //         animation={props.animation ?? []}
  //       />
  //     ))}
  //   </div>
  // );
};

export default TagBlock;
