import { CircularProgress } from '@mui/material';
import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import FlexContainer from '../Layout/FlexContainer';

type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonVariant = 'filled' | 'outlined' | 'text';
type ButtonColor = 'action' | 'static' | 'error';

type ButtonProps = {
  children: ReactNode | string;
  icon?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  color?: ButtonColor;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function Button({
  children,
  onClick,
  size = 'md',
  variant = 'filled',
  fullWidth = false,
  color = 'action',
  loading = false,
  className,
  icon,
  disabled,
}: ButtonProps) {
  const variantString = getVariantString(variant, color);

  return (
    <button
      onClick={onClick}
      className={twMerge(
        'px-6 py-1 rounded-xl transition-all border whitespace-nowrap text-center',
        fullWidth && 'w-full',
        size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
        variantString,
        loading && 'animate-pulse pointer-events-none opacity-30',
        disabled && 'pointer-events-none opacity-50',
        className
      )}
    >
      <FlexContainer className='p-0' align='center' justify='center'>
        {icon ? (
          <div className='h-fit aspect-square'>{icon}</div>
        ) : (
          loading && (
            <CircularProgress
              style={{
                width: '20px',
                height: '20px',
              }}
              sx={{
                color: color === 'action' ? 'var(--background-secondary)' : 'primary',
              }}
            />
          )
        )}
        {children}
      </FlexContainer>
    </button>
  );
}


function getVariantString (variant: ButtonVariant, color: ButtonColor) {
  const bgColors = {
    action: 'primary',
    error: 'red-500',
    static: 'background-secondary',
  };

  const textColors = {
    action: 'white',
    error: 'white',
    static: 'text-primary',
  };

  const hoverBgColors = {
    action: 'hover:bg-primary hover:text-white',
    error: 'hover:bg-red-500 hover:text-white',
    static: 'hover:bg-background-secondary/50',
  };

  if (variant === 'filled') {
    return `bg-${bgColors[color]} text-${textColors[color]} ${hoverBgColors[color]} border-transparent`;
  } else if (variant === 'outlined') {
    return `border-${bgColors[color]} text-${bgColors[color]} ${hoverBgColors[color]}`;
  } else {
    return `${textColors[color]} ${hoverBgColors[color]} border-transparent`;
  }
};