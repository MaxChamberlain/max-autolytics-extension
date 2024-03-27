import { twMerge } from 'tailwind-merge'

type FlexContainerProps = {
  children: React.ReactNode
  className?: string
  direction?: 'row' | 'column'
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly'
  align?: 'start' | 'end' | 'center' | 'stretch'
  gap?:
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '6'
    | '8'
    | '12'
    | '16'
    | '24'
    | '32'
    | '40'
    | '48'
    | '56'
    | '64'
  onClick?: () => void
}

export default function FlexContainer({
  children,
  className,
  direction = 'row',
  justify = 'start',
  align = 'start',
  gap = '2',
  onClick
}: FlexContainerProps) {
  const gapClass =
    gap === '0'
      ? 'gap-0'
      : gap === '1'
      ? 'gap-1'
      : gap === '2'
      ? 'gap-2'
      : gap === '3'
      ? 'gap-3'
      : gap === '4'
      ? 'gap-4'
      : gap === '6'
      ? 'gap-6'
      : gap === '8'
      ? 'gap-8'
      : gap === '12'
      ? 'gap-12'
      : gap === '16'
      ? 'gap-16'
      : gap === '24'
      ? 'gap-24'
      : gap === '32'
      ? 'gap-32'
      : gap === '40'
      ? 'gap-40'
      : gap === '48'
      ? 'gap-48'
      : gap === '56'
      ? 'gap-56'
      : gap === '64'
      ? 'gap-64'
      : 'gap-2'
  return (
    <div
      className={twMerge(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        justify === 'start'
          ? 'justify-start'
          : justify === 'end'
          ? 'justify-end'
          : justify === 'center'
          ? 'justify-center'
          : justify === 'between'
          ? 'justify-between'
          : justify === 'evenly'
          ? 'justify-evenly'
          : 'justify-around',
        align === 'start'
          ? 'items-start'
          : align === 'end'
          ? 'items-end'
          : align === 'center'
          ? 'items-center'
          : 'items-stretch',
        gapClass,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
