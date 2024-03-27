import { twMerge } from 'tailwind-merge'
import FlexContainer from '../Layout/FlexContainer'

type TextAreaProps = {
  value?: string
  onChange?: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  variant?: 'filled' | 'outlined' | 'underlined'
  loading?: boolean
  required?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
  id?: string
}

export default function TextArea({
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  variant = 'filled',
  loading = false,
  required = false,
  disabled = false,
  label,
  placeholder,
  id
}: TextAreaProps) {
  const variantString =
    variant === 'filled'
      ? 'rounded-md border bg-background-secondary border-transparent focus:ring-1 focus:ring-primary focus:border-transparent'
      : variant === 'outlined'
      ? 'rounded-md border border-background-tertiary bg-background-primary focus:ring-1 focus:ring-primary focus:border-transparent'
      : 'border-b-2 border-background-secondary bg-background-primary outline-none ring-none focus:border-primary'
  const onChangeFunction = onChange
    ? (e: any) => {
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
        onChange(e.target.value)
      }
    : () => {}
  return (
    <FlexContainer
      direction='column'
      className={twMerge(
        'w-full',
        loading && 'animate-pulse pointer-events-none opacity-30',
        disabled && 'pointer-events-none opacity-50'
      )}
    >
      {label && (
        <label className='ml-2 text-text-primary flex items-center gap-2'>
          {label}{' '}
          {required && (
            <span className='text-red-400 flex items-center text-sm'>
              * required
            </span>
          )}{' '}
        </label>
      )}
      <textarea
        value={value}
        onChange={onChangeFunction}
        disabled={disabled || loading}
        required={required}
        placeholder={placeholder}
        id={id}
        className={twMerge(
          'px-4 py-2 text-text-primary focus:outline-none hover:bg-background-secondary/50 transition-colors h-auto scrollbar-hide',
          fullWidth && 'w-full',
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
          variantString,
          disabled && 'bg-background-secondary text-text-primary'
        )}
      />
    </FlexContainer>
  )
}
