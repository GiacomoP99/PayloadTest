import type { ComposableBlock } from '@/payload-types';
import type React from 'react';
import { Fragment } from 'react';
import BaseBlock from './BaseBlock';
import { CallToActionBlock } from './CallToAction/Component';
import EmptyBlock from './EmptyBlock/Component';
import { FormBlock } from './Form/Component';
import FullImageBlock from './FullImageBlock/Component';
import GridBlock from './GridBlock/Component';
import NoContentBlock from './NoContentBlock/Component';
import RichTextBlockComponent from './RichTextBlock/Component';
import TagBlock from './TagBlock/Component';
import TitleBlock from './TitleBlock/Component';

const blockComponents = {
  defBlock: NoContentBlock,
  fib: FullImageBlock,
  rb: RichTextBlockComponent,
  tagsBlock: TagBlock,
  titleBlock: TitleBlock,
  callToActionBlock: CallToActionBlock,
  formBlock: FormBlock,
  emptyBlock: EmptyBlock,
  gridBlock: GridBlock
};

export const RenderComposable: React.FC<{
  blocks: ComposableBlock['content']['block'][0][];
  ovverideClassNames?: string;
  bgColor?: string;
}> = props => {
  const { blocks, bgColor } = props;
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;
  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map(block => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];
            const { baseBlockFields, ...rest } = block;
            if (Block) {
              return (
                <div key={block.id} id={block.id} className='h-full w-full'>
                  {baseBlockFields ? (
                    <div className='pb-9' key={block.id}>
                      <BaseBlock
                        {...baseBlockFields}
                        ovverideClassNames={props.ovverideClassNames}
                        bgColor={bgColor}
                      >
                        <Block {...rest} bgColor={bgColor} />
                      </BaseBlock>
                    </div>
                  ) : (
                    <Block key={block.id} {...rest} bgColor={bgColor} />
                  )}
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
