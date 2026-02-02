import { cn } from '@/utilities/ui';
import type {
  DefaultNodeTypes,
  DefaultTypedEditorState,
  SerializedLinkNode
} from '@payloadcms/richtext-lexical';
import {
  RichText as ConvertRichText,
  type JSXConvertersFunction,
  LinkJSXConverter
} from '@payloadcms/richtext-lexical/react';
import { textConverter } from './textConverter';

type NodeTypes = DefaultNodeTypes;

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!;
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object');
  }
  const slug = value.slug;
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters
}) => ({
  ...defaultConverters,
  ...textConverter,
  ...LinkJSXConverter({ internalDocToHref }),
  blocks: {}
});

type Props = {
  data: DefaultTypedEditorState;
  enableGutter?: boolean;
  enableProse?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props;
  return (
    <ConvertRichText
      converters={jsxConverters}
      className={cn(
        '',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'md:prose-md dark:prose-invert mx-auto': enableProse
        },
        className
      )}
      {...rest}
    />
  );
}
