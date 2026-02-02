import { createServerFeature } from '@payloadcms/richtext-lexical';

export const FontColor = createServerFeature({
  feature: () => {
    return {
      ClientFeature:
        '@/lexical-features/font-color/feature.client#MyClientFeature',
      clientFeatureProps: {}
    };
  },
  key: 'fontColor'
});
