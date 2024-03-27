import { twMerge } from 'tailwind-merge'
import FlexContainer from '../Layout/FlexContainer'
import { Button } from '.'

type NumberFieldProps = {
  value?: string | undefined | null
  onChange?: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  variant?: 'filled' | 'outlined' | 'underlined'
  loading?: boolean
  required?: boolean
  disabled?: boolean
  label?: string
  id?: string
}

export default function NumberField({
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  variant = 'filled',
  loading = false,
  required = false,
  disabled = false,
  label,
  id
}: NumberFieldProps) {
  const variantString =
    variant === 'filled'
      ? 'rounded-l-md border bg-background-secondary border-transparent focus:ring-1 focus:ring-primary focus:border-transparent'
      : variant === 'outlined'
      ? 'rounded-l-md border border-background-tertiary bg-background-primary focus:ring-1 focus:ring-primary focus:border-transparent'
      : 'border-b-2 border-background-secondary bg-background-primary outline-none ring-none focus:border-primary'
  const onChangeFunction = onChange
    ? (e: any) => onChange(e.target.value.replace(/\D.-/g, ''))
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
      <FlexContainer gap='0' className='p-0'>
        <input
          value={value ?? ''}
          onChange={onChangeFunction}
          disabled={disabled || loading}
          required={required}
          placeholder='0'
          id={id}
          className={twMerge(
            'px-4 py-1 text-text-primary focus:outline-none hover:bg-background-secondary/50 transition-colors',
            fullWidth && 'w-full',
            size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
            variantString,
            disabled && 'bg-background-secondary text-text-primary'
          )}
        />
        <Button
          variant={
            variant === 'filled'
              ? 'filled'
              : variant === 'outlined'
              ? 'outlined'
              : 'text'
          }
          color='static'
          className={twMerge('rounded-none h-full py-1 px-4', `text-${size}`)}
          onClick={() =>
            onChange && onChange((Number(value ?? '0') - 1).toString())
          }
        >
          -
        </Button>
        <Button
          variant={
            variant === 'filled'
              ? 'filled'
              : variant === 'outlined'
              ? 'outlined'
              : 'text'
          }
          color='static'
          className={twMerge(
            'rounded-r-xl rounded-l-none h-full py-1 px-4',
            `text-${size}`
          )}
          onClick={() =>
            onChange && onChange((Number(value ?? '0') + 1).toString())
          }
        >
          +
        </Button>
      </FlexContainer>
    </FlexContainer>
  )
}
