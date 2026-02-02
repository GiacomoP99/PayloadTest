'use client';
import Tag from '@/components/Tag';
import type {
  Governance,
  GovernanceBlock as GovernanceBlockProps
} from '@/payload-types';
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import RichTextBlockComponent from '../RichTextBlock/Component';

export const GovernanceBlock = (props: GovernanceBlockProps) => {
  const { externalTabs = [] } = (props.governance as Governance) ?? {
    externalTabs: []
  };

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

  useEffect(() => {
    console.log(
      'sub tab: ',
      externalTabs,
      externalTabs?.at(currentTab)?.subTab?.at(currentSubTab)?.column1
    );
  }, [currentSubTab]);

  if (!externalTabs) return null;

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex justify-center gap-4'>
        {externalTabs?.map((tab, index) => (
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
      <div className='flex justify-center gap-4'>
        {externalTabs?.at(currentTab)?.subTab?.map((subTab, index) => (
          <Tag
            id={subTab.id ?? ''}
            key={`sub-tab-${subTab.id}`}
            label={subTab.subTabLabel}
            onClick={() => setCurrentSubTab(index)}
            active={currentSubTab !== index}
            size='sm'
            style='outline-solid'
          />
        ))}
      </div>
      <h2 className='mt-8 mb-10 text-center font-bold text-foreground text-h6 sm:text-h5'>
        {externalTabs?.at(currentTab)?.subTab?.at(currentSubTab)?.subTabLabel}
      </h2>
      <div className='grid grid-cols-2 space-x-4'>
        {externalTabs?.at(currentTab)?.subTab?.at(currentSubTab)?.column1 && (
          <div className='text-align-left'>
            <RichTextBlockComponent
              description={
                externalTabs?.at(currentTab)?.subTab?.at(currentSubTab)
                  ?.column1 as DefaultTypedEditorState
              }
            />
          </div>
        )}
        {externalTabs?.at(currentTab)?.subTab?.at(currentSubTab)?.column2 && (
          <div className='text-align-left'>
            <RichTextBlockComponent
              description={
                externalTabs?.at(currentTab)?.subTab?.at(currentSubTab)
                  ?.column2 as DefaultTypedEditorState
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
