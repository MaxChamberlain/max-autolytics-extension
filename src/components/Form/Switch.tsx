import { twMerge } from 'tailwind-merge'
import FlexContainer from '../Layout/FlexContainer'
import { Switch as MuiSwitch } from '@mui/material'

type SwitchProps = {
  value?: boolean
  onChange?: (value: boolean) => void
  fullWidth?: boolean
  loading?: boolean
  required?: boolean
  disabled?: boolean
  label?: string
  id?: string
}

export default function Switch({
  value,
  onChange,
  fullWidth = false,
  loading = false,
  required = false,
  disabled = false,
  label,
  id
}: SwitchProps) {
  const onChangeFunction = onChange
    ? (e: any) => onChange(e.target.checked)
    : () => {}
  return (
    <FlexContainer
      direction='column'
      className={twMerge(
        loading && 'animate-pulse pointer-events-none opacity-30',
        disabled && 'pointer-events-none opacity-50',
        fullWidth && 'w-full'
      )}
      gap='1'
      align='center'
    >
      {label && (
        <label
          className={twMerge('ml-2 text-text-primary flex items-center gap-2')}
        >
          {label}{' '}
          {required && (
            <span className='text-red-400 flex items-center text-sm'>
              * required
            </span>
          )}{' '}
        </label>
      )}
      <MuiSwitch
        checked={value}
        onChange={onChangeFunction}
        disabled={disabled || loading}
        required={required}
        id={id}
        size='medium'
        color={'primary'}
      />
    </FlexContainer>
  )
}
