import { CustomThemeProvider } from '@/components/Themes/CustomThemeProvider';
import { FooterComponent } from '@/Footer/Component';
import { Header } from '@/Header/Component';
import configPromise from '@payload-config';
import { unstable_cache } from 'next/cache';
import { getPayload } from 'payload';

export const getCustomThemes = unstable_cache(
  async () => {
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
      collection: 'themes'
    });

    return res.docs;
  },
  ['custom-theme'],
  { tags: ['custom-theme'] }
);



export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string; lang: string }>;
}) {
  const { tenant, lang = 'en' } = await params;
  const themes = await getCustomThemes();

  return (
    <CustomThemeProvider tenant={tenant} themes={themes}>
      <Header tenant={tenant} lang={lang} />
      {children}
      <FooterComponent tenant={tenant} lang={lang} />
    </CustomThemeProvider>
  );
}
