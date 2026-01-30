'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger
} from '@/components/ui/select';
import { Languages } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import type React from 'react';

// Define available languages
// You can move this to a config file or fetch from Payload CMS if needed
const LANGUAGES = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' }
] as const;

export const LanguageSelector: React.FC<{ lang: string }> = ({ lang }) => {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current language, tenant, and rest from pathname
  // Path format: /[lang]/[tenant]/[...rest] or /[lang]/[tenant]
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentLanguage = pathSegments[0] || lang;
  const tenant = pathSegments[1] || '';
  const rest = pathSegments.slice(2); // Everything after lang and tenant

  // Generate new path with different language, preserving tenant and rest
  const getLanguagePath = (langCode: string): string => {
    // Build path: /[lang]/[tenant]/[...rest]
    let newPath = `/${langCode}`;

    if (tenant) {
      newPath += `/${tenant}`;
    }

    if (rest.length > 0) {
      newPath += `/${rest.join('/')}`;
    }

    return newPath;
  };

  const handleLanguageChange = (langCode: string) => {
    const newPath = getLanguagePath(langCode);
    router.push(newPath);
  };

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className='h-8 w-fit gap-2 border border-primary text-foreground'>
        <Languages className='h-4 w-4' />
      </SelectTrigger>

      <SelectContent>
        {LANGUAGES.map(langOption => (
          <SelectItem key={langOption.code} value={langOption.code}>
            <span className='flex items-center gap-2'>
              <span>{langOption.flag}</span>
              <span>{langOption.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
