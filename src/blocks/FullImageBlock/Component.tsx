import { Media } from '@/components/Media';
import type { FullImageBlock as FullImageBlockType } from '@/payload-types';

const FullImageBlock = (props: FullImageBlockType) => {
  return (
    <div className='h-full w-full'>
      {props.image && (
        <Media
          resource={props.image}
          imgClassName='w-full h-full object-cover'
        />
      )}
    </div>
  );
};

export default FullImageBlock;
