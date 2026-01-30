import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';
import { HeaderClient } from './Component.client';

async function getNavigationDataUncached(tenant: string) {
  const payload = await getPayload({ config: configPromise });

  // Parallelize all navigation queries
  const [
    headerData,
    caseStudiesCount,
    // researchCount,
    newsCount
    // papersCount,
    // landings,
    // elementsInnovation,
    // elementsMarket,
    // elementsTechnology
  ] = await Promise.all([
    payload.find({
      collection: 'headers',
      limit: 1,
      pagination: false,
      where: {
        tenant: {
          equals: tenant
        }
      }
    }),
    payload.count({
      collection: 'pages', // TODO: change to case studies
      overrideAccess: false
      // where: {
      //   archived: {
      //     equals: false
      //   }
      // }
    }),
    // payload.count({
    //   collection: 'research',
    //   overrideAccess: false,
    //   where: {
    //     archived: {
    //       equals: false
    //     }
    //   }
    // }),
    payload.count({
      collection: 'posts', // TODO: change to news
      overrideAccess: false
      // where: {
      //   draft: {
      //     equals: false
      //   }
      // }
    })
    // payload.count({
    //   collection: 'papers',
    //   overrideAccess: false,
    //   where: {
    //     archived: {
    //       equals: false
    //     }
    //   }
    // }),
    // payload.find({
    //   collection: 'landing',
    //   overrideAccess: false,
    //   limit: 100, // Reduced from 1000
    //   select: {
    //     label: true,
    //     slug: true
    //   },
    //   where: {
    //     'tenant.slug': {
    //       equals: tenant
    //     }
    //   }
    // }),
    // payload.find({
    //   collection: 'e_inn',
    //   overrideAccess: false,
    //   limit: 100, // Reduced from 1000
    //   select: {
    //     title: true,
    //     slug: true
    //   },
    //   where: {
    //     'tenant.slug': {
    //       equals: tenant
    //     }
    //   }
    // }),
    // payload.find({
    //   collection: 'e_mark',
    //   overrideAccess: false,
    //   limit: 100, // Reduced from 1000
    //   select: {
    //     title: true,
    //     slug: true
    //   }
    // }),
    // payload.find({
    //   collection: 'e_tech',
    //   overrideAccess: false,
    //   limit: 100, // Reduced from 1000
    //   select: {
    //     title: true,
    //     slug: true
    //   }
    // })
  ]);

  return {
    headerData,
    caseStudiesCount,
    // researchCount,
    newsCount
    // papersCount,
    // landings,
    // elementsInnovation,
    // elementsMarket,
    // elementsTechnology
  };
}

/**
 * Returns a cached navigation data function for the given tenant and user
 */
const getCachedNavigationData = (tenant: string) =>
  unstable_cache(
    async () => getNavigationDataUncached(tenant),
    ['navigation-data', tenant],
    {
      tags: ['navigation-data'],
      revalidate: 3600 // Revalidate every hour
    }
  );

// Helper function to get navigation data with caching
async function getNavigationData(tenant: string) {
  return getCachedNavigationData(tenant)();
}

export async function Header({
  tenant,
  lang
}: {
  tenant: string;
  lang: string;
}) {
  const { headerData, caseStudiesCount, newsCount } =
    await getNavigationData(tenant);

  return (
    <HeaderClient
      data={headerData.docs[0]}
      caseStudiesCount={caseStudiesCount.totalDocs}
      newsCount={newsCount.totalDocs}
      menus={[]}
      lang={lang}
    />
  );
}
