import { twMerge } from 'tailwind-merge'
import FlexContainer from '../Layout/FlexContainer'
import { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ErrorIcon from '@mui/icons-material/Error'

type TextFieldProps = {
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
  type?: string
  icon?: React.ReactNode
  errorMessage?: string
  defaultValue?: string
}

export default function TextField({
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
  id,
  type = 'text',
  icon,
  errorMessage,
  defaultValue
}: TextFieldProps) {
  const [visible, setVisible] = useState(false)

  const variantString =
    variant === 'filled'
      ? 'rounded-md border bg-background-secondary border-transparent focus:ring-1 focus:ring-primary focus:border-transparent'
      : variant === 'outlined'
      ? 'rounded-md border border-background-tertiary bg-background-primary focus:ring-1 focus:ring-primary focus:border-transparent'
      : 'border-b-2 border-background-secondary bg-background-primary outline-none ring-none focus:border-primary'
  const onChangeFunction = onChange
    ? (e: any) => onChange(e.target.value)
    : () => {}
  const displayIcon = icon ? (
    icon
  ) : type === 'password' ? (
    visible ? (
      <VisibilityOffIcon
        onClick={() => setVisible(false)}
        style={{ width: 20, height: 20 }}
      />
    ) : (
      <VisibilityIcon
        onClick={() => setVisible(true)}
        style={{ width: 20, height: 20 }}
      />
    )
  ) : errorMessage ? (
    <ErrorIcon style={{ width: 20, height: 20, fill: 'hsl(0,70%,50%)' }} />
  ) : null

  return (
    <FlexContainer
      direction='column'
      className={twMerge(
        loading && 'animate-pulse pointer-events-none opacity-30',
        disabled && 'pointer-events-none opacity-50',
        fullWidth && 'w-full'
      )}
      gap='1'
    >
      {label && (
        <label
          className={twMerge(
            'ml-2 text-text-primary flex items-center gap-2',
            errorMessage ? 'text-red-500' : ''
          )}
        >
          {label}{' '}
          {required && (
            <span className='text-red-400 flex items-center text-sm'>
              * required
            </span>
          )}{' '}
        </label>
      )}
      <div className='h-fit relative w-full'>
        <input
          value={value}
          onChange={onChangeFunction}
          disabled={disabled || loading}
          required={required}
          placeholder={placeholder}
          id={id}
          type={type === 'password' ? (visible ? 'text' : 'password') : type}
          defaultValue={defaultValue}
          className={twMerge(
            'px-4 py-1 text-text-primary focus:outline-none hover:bg-background-secondary/50 transition-colors shadow-sm w-full',
            size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
            variantString,
            disabled && 'bg-background-secondary text-text-primary',
            type === 'password' && 'pr-10',
            errorMessage && 'border border-red-500 bg-red-500/20'
          )}
        />
        {displayIcon && (
          <div
            className={twMerge(
              'absolute right-0 top-0 h-full w-fit p-1 cursor-pointer -pt-1',
              variantString,
              'border-l border-background-tertiary rounded-l-none',
              variant === 'filled' && 'rounded-r-md border-0',
              variant === 'underlined' && 'border-0 h-[calc(100%-2px)]',
              errorMessage && 'border border-red-500 border-l-0 bg-red-500/0'
            )}
          >
            {displayIcon}
          </div>
        )}
      </div>
      {errorMessage && (
        <div className='text-red-500 text-xs'>{errorMessage}</div>
      )}
    </FlexContainer>
  )
}
