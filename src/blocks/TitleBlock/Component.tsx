'use client';
import type { TitleBlock as TitleBlockProps } from '@/payload-types';
import { cn } from '@/utilities/ui';

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

const TitleBlock = (props: TitleBlockProps) => {
  // const { theme } = useCustomThemeSafe();
  // const [bgColorValue, setBgColorValue] = useState<string | undefined>(
  //   undefined
  // );
  // useEffect(() => {
  //   if (theme) {
  //     const bgColorKey = Object.keys(theme).find(key =>
  //       key.endsWith(props.bgColor ?? 'white')
  //     );
  //     setBgColorValue(
  //       Color(theme[bgColorKey]?.split(';')[0] ?? '#FFFFFF').hex()
  //     );
  //   }
  // }, [theme]);
  return (
    <h3
      className={cn('mt-8 mb-10 text-center text-foreground', {
        // 'text-primary': wcagContrastChecker(
        //   bgColorValue ?? '#FFFFFF',
        //   '#000000'
        // ).regularText.aa,
        // 'text-white': !wcagContrastChecker(bgColorValue ?? '#FFFFFF', '#000000')
        //   .regularText.aa
      })}
    >
      {props.title}
    </h3>
  );
};

export default TitleBlock;
