'use client';
import Tag from '@/components/Tag';
import type { TabsBlock as TabsBlockProps } from '@/payload-types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ComposableBlock from '../ComposableBlock/Component';

export const TabsBlock = (props: TabsBlockProps) => {
  const { tabs = [], ExternalTabs = [] } = props;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [currentTab, setCurrentTab] = useState(0);
  const [currentSubTab, setCurrentSubTab] = useState(0);

  // Update URL when state changes
  const updateURL = useCallback(
    (newTab: number) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update or remove page parameter
      if (newTab === 0) {
        params.delete('tabs');
      } else {
        params.set('tabs', newTab.toString());
      }

      const queryString = params.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newURL, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // Handle page changes
  const handleTabChange = useCallback(
    (tab: number) => {
      setCurrentTab(tab);
      // updateURL(tab);
    },
    [updateURL]
  );

  // Sync state with URL parameters when they change externally
  // useEffect(() => {
  //   const urlTab = parseInt(searchParams.get('tabs') || '0', 10);

  //   if (urlTab !== currentTab) {
  //     setCurrentTab(urlTab);
  //   }
  // }, [searchParams, currentTab]);
  useEffect(() => {
    setCurrentSubTab(0);
  }, [currentTab]);

  if (!tabs && !ExternalTabs) return null;

  return ExternalTabs && ExternalTabs?.length > 0 ? (
    <div className='mt-8 flex flex-col gap-6'>
      <div className='crollbar-hide flex gap-4 overflow-x-auto sm:justify-center sm:overflow-x-visible'>
        {ExternalTabs?.map((tab, index) => (
          <Tag
            key={tab.id}
            id={tab.id ?? ''}
            label={tab.label}
            onClick={() => handleTabChange(index)}
            active={currentTab !== index}
            isTab
          />
        ))}
      </div>
      <div className='crollbar-hide flex gap-4 overflow-x-auto sm:justify-center sm:overflow-x-visible'>
        {ExternalTabs?.at(currentTab)?.subTab?.map((subTab, index) => (
          <Tag
            id={subTab.id ?? ''}
            label={subTab.subTabLabel}
            onClick={() => setCurrentSubTab(index)}
            active={currentSubTab !== index}
            size='sm'
            style='outline-solid'
          />
        ))}
      </div>
      <div className='flex justify-center'>
        {ExternalTabs?.at(currentTab)?.subTab?.at(currentSubTab)?.content && (
          <ComposableBlock
            {...(ExternalTabs?.at(currentTab)?.subTab?.at(currentSubTab)
              ?.content?.[0] ?? {})}
          />
        )}
      </div>
    </div>
  ) : (
    <div className='mt-8 flex flex-col gap-6'>
      <div className='scrollbar-hide flex gap-4 overflow-x-auto sm:justify-center sm:overflow-x-visible'>
        {tabs?.map((tab, index) => (
          <Tag
            id={tab.id ?? ''}
            key={tab.id}
            label={tab.tab.label}
            onClick={() => handleTabChange(index)}
            active={currentTab !== index}
            isTab
          />
        ))}
      </div>
      <div className='flex justify-center'>
        {tabs?.at(currentTab)?.tab.content && (
          <ComposableBlock
            {...(tabs?.at(currentTab)?.tab.content?.[0] ?? {})}
          />
        )}
      </div>
    </div>
  );
};
