import { twMerge } from 'tailwind-merge'
import ModalTitle from './ModalTitle'
import ModalContext from './ModalContext'

type ModalProps = {
  children: React.ReactNode | React.ReactNode[]
  width?:
    | 'uncontrolled'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | 'full'
    | 'screen'
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl'  | 'border'
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void
  className?: string
}

export default function Modal({
  children,
  width = 'uncontrolled',
  shadow = 'none',
  onClick,
  className
}: ModalProps) {
  return (
    <div
      className={twMerge(
        'p-2 rounded-xl border border-background-secondary bg-background-primary ',
        width === 'uncontrolled' && 'w-auto',
        width === 'xs' && 'w-64',
        width === 'sm' && 'w-96',
        width === 'md' && 'w-[28rem]',
        width === 'lg' && 'w-[32rem]',
        width === 'xl' && 'w-[40rem]',
        width === '2xl' && 'w-[50rem]',
        width === 'full' && 'w-full',
        width === 'screen' && 'w-screen',
        shadow === 'none' && 'shadow-none',
        shadow === 'sm' && 'shadow-sm',
        shadow === 'md' && 'shadow-md',
        shadow === 'lg' && 'shadow-lg',
        shadow === 'xl' && 'shadow-xl',
        shadow === 'border' && 'border border-background-tertiary',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export { Modal, ModalTitle, ModalContext }
