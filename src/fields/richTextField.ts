import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature
} from '@payloadcms/richtext-lexical';
import type { Field } from 'payload';

const EMPTY_CONTENT = {
  root: {
    children: [
      {
        children: [],
        direction: null,
        format: '',
        indent: 0,
        type: 'paragraph',
        version: 1
      }
    ],
    direction: null,
    format: '',
    indent: 0,
    type: 'root',
    version: 1
  }
};

export const richtextField = (
  name?: string,
  label?: { it: string; en: string }
): Field => ({
  name: name ?? 'description',
  localized: true,
  type: 'richText',
  label,
  defaultValue: EMPTY_CONTENT,
  editor: lexicalEditor({
    features: ({ rootFeatures }) => {
      return [
        ...rootFeatures,
        HeadingFeature({
          enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
        }),
        UnorderedListFeature(),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        AlignFeature()
      ];
    }
  })
});
