import type { CollectionSlug, PayloadRequest } from 'payload';

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  landing: '/dashboard'
};

type Props = {
  collection: keyof typeof collectionPrefixMap;
  slug: string;
  req: PayloadRequest;
  tenant: string;
  lang: string;
};

export const generatePreviewPath = ({
  collection,
  slug,
  tenant,
  lang
}: Props) => {
  // Allow empty strings, e.g. for the homepage
  if (slug === undefined || slug === null) {
    return null;
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug);

  const encodedParams = new URLSearchParams({
    slug: encodedSlug,
    collection,
    path: `/${lang}/${tenant}/${collectionPrefixMap[collection]}/${encodedSlug}`,
    previewSecret: process.env.PREVIEW_SECRET || ''
  });

  const url = `/next/preview?${encodedParams.toString()}`;

  return url;
};
