'use client';

import type { ToolbarGroupItem } from '@payloadcms/richtext-lexical';
import { createClientFeature } from '@payloadcms/richtext-lexical/client';
import {
  $getSelection,
  $isRangeSelection
} from '@payloadcms/richtext-lexical/lexical';
import { $patchStyleText } from '@payloadcms/richtext-lexical/lexical/selection';
import { FeatureIcon } from './common';

const variables = [
  'default',
  '--theme-primary-foreground',
];

const labels: Record<string, { it: string; en: string }> = {
  default: { it: 'Predefinito', en: 'Default' },
  '--theme-primary-foreground': { it: 'Bianco', en: 'White' },
};

export const MyClientFeature = createClientFeature(() => {
  return {
    toolbarFixed: {
      groups: [
        {
          type: 'dropdown',
          ChildComponent: FeatureIcon,
          items: variables.map(
            name =>
              ({
                ChildComponent: FeatureIcon,
                key: `node-${name}`,
                label: ({ i18n }) => {
                  const lang = i18n.language as 'it' | 'en';
                  return labels[name]?.[lang] ?? name;
                },
                onSelect: ({ editor }) => {
                  editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                      if (name === 'default') {
                        $patchStyleText(selection, {
                          color: null
                        });
                      } else {
                        $patchStyleText(selection, {
                          color: `hsl(var(${name})) !important`
                        });
                      }
                    }
                  });
                }
              }) as ToolbarGroupItem
          ),
          key: 'fontColor'
        }
      ]
    }
  };
});
