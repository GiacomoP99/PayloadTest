import { FormBlock } from '@/blocks/Form/Component';
import { formatBackground } from '@/fields/themeColorField';
import type { Page } from '@/payload-types';
import type React from 'react';
import { Fragment } from 'react';
import BaseBlock from './BaseBlock';
import { CarouselSectionBlock } from './CarouselSection/Component';
import { ContentBlock } from './Content/Component';
import { FullCardBlock } from './FullCardBlock/Component';
import NoContentBlock from './NoContentBlock/Component';

const blockComponents = {
  formBlock: FormBlock,
  content: ContentBlock,
  defBlock: NoContentBlock,
  caro: CarouselSectionBlock,
  fullcard: FullCardBlock
};

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][];
  ovverideClassNames?: string;
}> = props => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;
  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map(block => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];
            // @ts-expect-error
            const { baseBlockFields, ...rest } = block;

            if (Block) {
              if (blockType === 'comp') {
                return (
                  <div
                    className={`${formatBackground(block.themeColor)}`}
                    key={block.id}
                  >
                    <Block {...{ ...rest }} />
                  </div>
                );
              }
              return (
                <div
                  className={`px-9 py-9 sm:px-0 ${formatBackground(block.baseBlockFields?.themeColor)}`}
                  key={block.id}
                >
                  <BaseBlock
                    {...baseBlockFields}
                    bgColor={block.baseBlockFields?.themeColor}
                    ovverideClassNames={props.ovverideClassNames}
                  >
                    <Block {...rest} />
                  </BaseBlock>
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
