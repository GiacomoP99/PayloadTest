'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Tag from '../Tag';

interface TagFilterProps {
  cardTypes: {
    title: string;
    value: string;
  }[];
  t?: (type: string) => string;
}

const TagFilter = ({ cardTypes, t }: TagFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL parameters
  const [filterSelected, setFilterSelected] = useState('All');

  // Update URL when state changes
  const updateURL = useCallback(
    (newFilter: string) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update or remove filter parameter
      if (newFilter === 'All') {
        params.delete('filter');
      } else {
        params.set('filter', newFilter);
      }

      const queryString = params.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;

      router.push(newURL, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (filter: string) => {
      setFilterSelected(filter);
      updateURL(filter);
    },
    [updateURL]
  );

  // Sync state with URL parameters when they change externally
  useEffect(() => {
    const urlFilter = searchParams.get('filter') || 'All';

    if (urlFilter !== filterSelected) {
      setFilterSelected(urlFilter);
    }
  }, [searchParams, filterSelected]);

  return (
    <div className='flex justify-center gap-2'>
      {cardTypes.map((type, index) => (
        <Tag
          key={index}
          label={t ? t(type.title) : type.title}
          id={type.value}
          onClick={() => handleFilterChange(type.value)}
          active={filterSelected !== type.value}
          size='sm'
          animation={['hover']}
        />
      ))}
    </div>
  );
};

export default TagFilter;
