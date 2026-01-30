import { cn } from '@/utilities/ui';

interface TagProps {
  label: string;
  style?: 'default' | 'outline-solid';
  active?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  id: string;
  onClick?: () => void;
  isTab?: boolean;
  animation?: ('entrance' | 'hover')[];
}

const Tag = ({
  label,
  style = 'default',
  active = false,
  size = 'md',
  id,
  isTab = false,
  onClick,
  animation = []
}: TagProps) => {
  return (
    <button
      key={id}
      title={isTab ? label : undefined}
      onClick={onClick}
      type='button'
      className={cn('content-center rounded-full px-8 text-center', {
        'line-clamp-2 h-24 w-fit min-w-40 text-h7 sm:text-h6': size === 'lg',
        'line-clamp-2 h-20 w-fit min-w-40 text-h7 sm:text-h6': size === 'md',
        'h-14 min-w-40 text-body': size === 'sm',
        'h-8 px-4 text-xsmall': size === 'xs',
        'bg-foreground text-accent-foreground': !active,
        'bg-card text-foreground hover:bg-foreground hover:text-accent-foreground':
          active && style === 'default',
        'border border-primary bg-background text-foreground':
          active && style === 'outline-solid',
        'cursor-pointer': !!onClick,
        'max-w-64 truncate text-wrap': isTab,
        'transition-all duration-300 hover:scale-105':
          animation.includes('hover')
      })}
    >
      {label}
    </button>
  );
};

export default Tag;
