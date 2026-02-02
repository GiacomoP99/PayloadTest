import RichText from '@/components/RichText';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';

const RichTextBlockComponent = ({
  description
}: {
  description: DefaultTypedEditorState;
}) => {
  return (
    <div className='flex'>{description && <RichText data={description} />}</div>
  );
};

export default RichTextBlockComponent;
