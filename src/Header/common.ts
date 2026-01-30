import type { CollectionSlug } from 'payload';

export const ELEMENTS_COLLECTIONS: CollectionSlug[] = [
  'e_inn',
  'e_mark',
  'e_tech'
];

export interface PageReference {
  relationTo: string;
  value: {
    slug: string;
    landing?: {
      slug: string;
    };
  };
}

export const formatPath = (curr: string, slug: string) => {
  const tenant = curr.split('/').at(1);
  return `/${tenant}/${slug}`;
};

export const formatReferencePath = (
  curr: string,
  reference?: PageReference | null
) => {
  const { value, relationTo = '' } = reference ?? {};
  const tenant = curr.split('/').at(1);
  let res = `/${tenant}`;

  if ([...ELEMENTS_COLLECTIONS, 'landing'].includes(relationTo)) {
    res += '/dashboard';
  }
  if (
    ELEMENTS_COLLECTIONS.includes(relationTo as CollectionSlug) &&
    value?.landing?.slug
  ) {
    res += `/${value.landing?.slug}`;
  }

  if (relationTo === 'casestudies') {
    res += '/casestudies';
  }

  res += `/${value?.slug}`;

  return res;
};
