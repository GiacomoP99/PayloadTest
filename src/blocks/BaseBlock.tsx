'use client';
import { CMSLink, type CMSLinkType } from '@/components/Link';
import { cn } from '@/utilities/ui';
import { RichText } from '@payloadcms/richtext-lexical/react';

// // Import both contexts - we'll check both to see which provider is available
// // eslint-disable-next-line @typescript-eslint/no-require-imports
// const previewContext =
//   require('@/app/(preview)/next/preview/[tenant]/layout.client').CustomThemeContext;
// // eslint-disable-next-line @typescript-eslint/no-require-imports
// const frontendContext =
//   require('@/app/(frontend)/[tenant]/layout.client').CustomThemeContext;

// // Hook that checks both contexts and uses whichever provider is available
// function useCustomThemeSafe(): { theme: Theme | null } {
//   // Always call both useContext hooks (React rules require consistent hook calls)
//   const previewTheme = useContext(previewContext);
//   const frontendTheme = useContext(frontendContext);

//   // Use whichever context has a value (is not undefined)
//   if (previewTheme !== undefined) {
//     return previewTheme as { theme: Theme | null };
//   }
//   if (frontendTheme !== undefined) {
//     return frontendTheme as { theme: Theme | null };
//   }

//   // If neither is available, return null theme
//   return { theme: null };
// }

interface BaseBlockProps {
  title?: string;
  description?: any;
  hasLink?: boolean | null;
  link?: CMSLinkType;
  children: React.ReactNode;
  textAlignment: 'left' | 'center' | 'right';
  ovverideClassNames?: string;
  // bgColor?: string;
}

const BaseBlock = ({
  title,
  description,
  hasLink,
  link,
  children
  // bgColor
}: BaseBlockProps) => {
  // const { theme } = useCustomThemeSafe();
  // const [bgColorValue, setBgColorValue] = useState<string | undefined>(
  //   undefined
  // );
  // useEffect(() => {
  //   if (theme) {
  //     const bgColorKey = Object.keys(theme).find(key =>
  //       key.endsWith(bgColor ?? 'white')
  //     );
  //     setBgColorValue(
  //       Color(theme[bgColorKey]?.split(';')[0] ?? '#FFFFFF').hex()
  //     );
  //   }
  // }, [theme]);

  return (
    <div
      className={cn('container mx-auto mb-6 text-center', {
        // 'text-primary': wcagContrastChecker(
        //   bgColorValue ?? '#FFFFFF',
        //   '#000000'
        // ).regularText.aa,
        // 'text-white': !wcagContrastChecker(bgColorValue ?? '#FFFFFF', '#000000')
        //   .regularText.aa
      })}
    >
      {title && <h3 className='mt-8 mb-10'>{title}</h3>}
      {description && <RichText data={description} />}
      {children}
      {hasLink && (
        <div className='mt-6 flex justify-center'>
          <CMSLink {...link} />
        </div>
      )}
    </div>
  );
};

export default BaseBlock;
