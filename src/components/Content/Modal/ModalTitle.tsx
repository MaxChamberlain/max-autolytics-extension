import FlexContainer from '../../../components/Layout/FlexContainer'
import { twMerge } from 'tailwind-merge'

type ModalTitleProps = {
  center?: boolean
  children: React.ReactNode | React.ReactNode[] | string
  type?: 'heading' | 'subheading' | 'miniheading'
  noUnderline?: boolean
  fullWidth?: boolean
  className?: string
  actionComponent?: React.ReactNode
  containerClassname?: string
}

export default function ModalTitle({
  children,
  center,
  type = 'heading',
  noUnderline,
  fullWidth,
  className,
  actionComponent,
  containerClassname
}: ModalTitleProps) {
  return (
    <FlexContainer
      justify='between'
      align='center'
      className={twMerge(
        'w-full border-b border-background-tertiary',
        noUnderline && 'border-none',
        containerClassname
      )}
    >
      <h1
        className={twMerge(
          'text-xl font-semibold p-2',
          center && 'text-center',
          type === 'subheading' && 'text-base font-normal',
          type === 'miniheading' && 'text-sm font-normal text-text-secondary',
          fullWidth && 'w-full',
          className
        )}
      >
        {children}
      </h1>
      {actionComponent}
    </FlexContainer>
  )
}
