import { twMerge } from 'tailwind-merge'
import FlexContainer from '../Layout/FlexContainer'
import './styles.css'
import ReactSelect, { GroupBase, OptionProps } from 'react-select'

type SelectProps = {
  value?: any
  onChange?: (newValue: any) => void
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  variant?: 'filled' | 'outlined' | 'underlined'
  loading?: boolean
  required?: boolean
  disabled?: boolean
  label?: string
  placeholder?: string
  id?: string
  options: any[]
  labelKey: string
  valueKey: string
}

export default function Select({
  value,
  onChange: onChangeFunction,
  size = 'md',
  fullWidth = false,
  variant = 'filled',
  loading = false,
  required = false,
  disabled = false,
  label,
  id,
  options,
  labelKey,
  valueKey
}: SelectProps) {
  const variantString =
    variant === 'filled'
      ? 'rounded-md border bg-background-secondary border-transparent focus:ring-1 focus:ring-primary focus:border-transparent'
      : variant === 'outlined'
      ? 'rounded-md border border-background-tertiary bg-background-primary focus:ring-1 focus:ring-primary focus:border-transparent'
      : 'border-b-2 border-background-secondary bg-background-primary outline-none ring-none focus:border-primary'
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
      <ReactSelect
        value={value}
        onChange={(newValue: any) => {
          onChangeFunction &&
            onChangeFunction(
              typeof newValue === 'string' || typeof newValue === 'number'
                ? newValue
                : newValue[valueKey]
            )
        }}
        isDisabled={disabled || loading}
        required={required}
        id={id}
        placeholder='Select'
        isSearchable
        isClearable={false}
        isMulti={false}
        unstyled
        closeMenuOnSelect
        getOptionLabel={(option: any) => {
          if (typeof option === 'string' || typeof option === 'number') {
            return options.find((o: any) => o[valueKey] === option)?.[labelKey]
          }
          return option[labelKey]
        }}
        getOptionValue={(option: any) => {
          if (typeof option === 'string' || typeof option === 'number') {
            return options.find((o: any) => o[valueKey] === option)?.[valueKey]
          }
          return option[valueKey]
        }}
        isOptionSelected={(option: any) => {
          return value === option[valueKey]
        }}
        controlShouldRenderValue
        classNames={{
          control: () =>
            twMerge(
              'px-4 py-0 m-0 text-text-primary focus:outline-none hover:bg-background-secondary/50 transition-colors shadow-sm min-h-[34px_!important]',
              size === 'sm'
                ? 'text-sm'
                : size === 'md'
                ? 'text-base'
                : 'text-lg',
              variantString,
              disabled && 'bg-background-secondary text-text-primary'
            ),
          menu: () =>
            twMerge(
              'flex flex-col w-full gap-2 bg-background-primary absolute max-h-[28rem] overflow-y-auto top-full mt-4 border border-background-tertiary rounded-md'
            ),
          multiValue: () =>
            twMerge(
              'bg-text-primary text-white rounded-full m-1 px-2 flex items-center gap-1'
            ),
          valueContainer: () => twMerge('p-0 m-0 '),
          option: (props: OptionProps<string, boolean, GroupBase<string>>) => {
            const isFocused = props.isFocused
            const isSelected = props.isSelected
            return twMerge(
              'p-2 cursor-pointer',
              isFocused && 'bg-background-secondary/50',
              isSelected && 'bg-primary text-white'
            )
          }
        }}
        className={twMerge('p-0 m-0 -mt-1', fullWidth && 'w-full')}
        options={options}
      />
    </FlexContainer>
  )
}
