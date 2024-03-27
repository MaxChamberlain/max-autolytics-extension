import { twMerge } from 'tailwind-merge'

type ModalContentProps = {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export default function ModalContent({
  children,
  className
}: ModalContentProps) {
  return <div className={twMerge('p-2 w-full', className)}>{children}</div>
}
