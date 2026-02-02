import RichText from '@/components/RichText';
import type { GridBlock as GridBlockProps } from '@/payload-types';

const GridBlock: React.FC<GridBlockProps> = props => {
  const items = props.items || [];

  const getBackgroundStyle = (item: (typeof items)[0]) => {
    if (
      item.backgroundType === 'image' &&
      item.backgroundImage &&
      typeof item.backgroundImage !== 'string' &&
      item.backgroundImage.url
    ) {
      return {
        backgroundImage: `url(${item.backgroundImage.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }

    return {
      backgroundColor: item.backgroundColor || '#D9D9D9'
    };
  };

  return (
    <div className='grid grid-cols-[repeat(2,196px)] gap-6'>
      {items.map((item, index) => (
        <div
          key={index}
          className='flex h-[196px] w-[196px] items-center justify-center rounded-xl p-3'
          style={{
            ...getBackgroundStyle(item)
          }}
        >
          {item.backgroundType === 'color' && item.description && (
            <RichText data={item.description} />
          )}
        </div>
      ))}
    </div>
  );
};

export default GridBlock;
