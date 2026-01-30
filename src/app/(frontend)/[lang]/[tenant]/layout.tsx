import { Footer } from '@/Footer/Component';
import { Header } from '@/Header/Component';

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ tenant: string; lang: string }>;
}) {
  const { tenant, lang = 'en' } = await params;
  return (
    <>
      <Header tenant={tenant} lang={lang} />
      {children}
      <Footer />
    </>
  );
}
