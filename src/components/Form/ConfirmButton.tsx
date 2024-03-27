import { CircularProgress } from '@mui/material'
import { ReactNode, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import FlexContainer from '../Layout/FlexContainer'
import Dialog from '../Content/Dialog'
import { ModalTitle } from '../Content/Modal'
import ModalContent from '../Content/Modal/ModalContent'
import Button from './Button'

type ConfirmButtonProps = {
  children: ReactNode | string
  icon?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  variant?: 'filled' | 'outlined' | 'text'
  fullWidth?: boolean
  color?: 'action' | 'static' | 'error'
  className?: string
  onClick: () => void
  disabled?: boolean
  loading?: boolean
  confirmMessage?: string | ReactNode
  isIreversibleAction?: boolean
  confirmCriteria?: boolean
}

type ConfirmMenuProps = {
  open: boolean
  onClose: () => void
  message: string | ReactNode
  onConfirm: () => void
  isIreversibleAction: boolean
  confirmCriteria?: boolean
}

export default function ConfirmButton({
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
  confirmMessage,
  isIreversibleAction = false,
  confirmCriteria = true
}: ConfirmButtonProps) {
  const [confirmOpen, setConfirmOpen] = useState(false)

  let variantString
  if (variant === 'filled') {
    if (color === 'action')
      variantString =
        'bg-primary text-white hover:brightness-110 border-transparent'
    else if (color === 'error')
      variantString =
        'bg-red-500 text-white hover:brightness-110 border-transparent'
    else
      variantString =
        'bg-background-secondary hover:bg-background-secondary/50 text-text-primary border-transparent'
  } else if (variant === 'outlined') {
    if (color === 'action')
      variantString =
        'border-primary text-primary hover:bg-primary hover:text-white'
    else if (color === 'error')
      variantString =
        'border-red-500 text-red-500 hover:bg-red-500 hover:text-white'
    else
      variantString =
        'border-background-tertiary text-text-primary hover:bg-background-secondary/50'
  } else {
    if (color === 'action')
      variantString = 'text-primary hover:bg-text-primary/10 border-transparent'
    else if (color === 'error')
      variantString = 'text-red-500 hover:bg-red-500/10 border-transparent'
    else
      variantString =
        'text-text-primary hover:bg-background-secondary/50 border-transparent'
  }

  return (
    <>
      <button
        onClick={(e: any) => {
          e.preventDefault()
          e.stopPropagation()
          setConfirmOpen(true)
        }}
        className={twMerge(
          'px-6 py-1 rounded-xl transition-all border whitespace-nowrap text-center',
          fullWidth && 'w-full',
          size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-lg',
          variantString,
          (loading || confirmOpen) &&
            'animate-pulse pointer-events-none opacity-30',
          disabled && 'pointer-events-none opacity-50',
          className
        )}
      >
        <FlexContainer className='p-0' align='center' justify='center'>
          {icon ? (
            <div className='h-fit aspect-square'>{icon}</div>
          ) : (
            (loading || confirmOpen) && (
              <CircularProgress
                style={{
                  width: '20px',
                  height: '20px'
                }}
                sx={{
                  color:
                    color === 'action'
                      ? 'var(--background-secondary)'
                      : 'primary'
                }}
              />
            )
          )}
          {children}
        </FlexContainer>
      </button>
      <ConfirmMenu
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        message={confirmMessage ?? 'Are you sure?'}
        isIreversibleAction={Boolean(isIreversibleAction)}
        onConfirm={onClick}
        confirmCriteria={confirmCriteria}
      />
    </>
  )
}

function ConfirmMenu({
  open,
  onClose,
  message,
  onConfirm,
  isIreversibleAction,
  confirmCriteria = true
}: ConfirmMenuProps) {
  return (
    <Dialog open={open} onClose={onClose} width='lg'>
      <ModalTitle>Are You Sure?</ModalTitle>
      <ModalContent>
        <div className='mb-8'>
          <p>{message}</p>
        </div>
        {isIreversibleAction && (
          <FlexContainer justify='center'>
            <p className='text-red-500 mb-2'>This action cannot be undone.</p>
          </FlexContainer>
        )}
        <FlexContainer gap='4' justify='end'>
          <Button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              onClose()
            }}
            color='error'
            fullWidth
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            color='action'
            fullWidth
            disabled={!confirmCriteria}
          >
            Yes, I&apos;m Sure
          </Button>
        </FlexContainer>
      </ModalContent>
    </Dialog>
  )
}
