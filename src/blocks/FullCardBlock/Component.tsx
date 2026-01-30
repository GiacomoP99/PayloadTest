'use client';
import type { FullCardBlock as FullCardBlockProps } from '@/payload-types';
import type React from 'react';
import { FullCardList } from './components/multiple';
import { SingularFullCard } from './components/singular';

export const FullCardBlock: React.FC<FullCardBlockProps> = props => {
  switch (props.type) {
    case 'list': {
      return <FullCardList {...props.list} />;
    }
    default: {
      return <SingularFullCard {...props.single} />;
    }
  }
};
