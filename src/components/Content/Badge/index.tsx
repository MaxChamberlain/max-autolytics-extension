import { twMerge } from 'tailwind-merge'
import FlexContainer from '../../../components/Layout/FlexContainer'
import CloseIcon from '@mui/icons-material/Close'

type BadgeProps = {
  message?: string
  severity: 'error' | 'warning' | 'info' | 'success'
  fullWidth?: boolean
  onClose?: () => void
}

export default function Badge({
  message,
  severity,
  fullWidth,
  onClose
}: BadgeProps) {
  const backgroundStr =
    severity === 'error'
      ? 'bg-red-100'
      : severity === 'warning'
      ? 'bg-yellow-100'
      : severity === 'info'
      ? 'bg-blue-100'
      : 'bg-green-100'
  const borderStr =
    severity === 'error'
      ? 'border-red-300'
      : severity === 'warning'
      ? 'border-yellow-300'
      : severity === 'info'
      ? 'border-blue-300'
      : 'border-green-300'
  const textStr =
    severity === 'error'
      ? 'text-red-700'
      : severity === 'warning'
      ? 'text-yellow-700'
      : severity === 'info'
      ? 'text-blue-700'
      : 'text-green-700'
  const closeIconBgStr =
    severity === 'error'
      ? 'bg-red-700'
      : severity === 'warning'
      ? 'bg-yellow-700'
      : severity === 'info'
      ? 'bg-blue-700'
      : 'bg-green-700'
  const closeIconStr =
    severity === 'error'
      ? 'text-red-100'
      : severity === 'warning'
      ? 'text-yellow-100'
      : severity === 'info'
      ? 'text-blue-100'
      : 'text-green-100'

  if (!open) return null
  return (
    <div
      className={twMerge(
        'p-1 rounded-md border cursor-pointer w-fit text-center text-xs',
        backgroundStr,
        borderStr,
        textStr,
        'flex justify-center items-center',
        fullWidth && 'w-full',
        onClose && 'cursor-pointer'
      )}
      onClick={onClose}
    >
      <FlexContainer gap='2' align='center'>
        {message && (
          <span className='text-center max-h-[6rem] overflow-x-auto'>
            {message}
          </span>
        )}
        {onClose && (
          <div
            className={twMerge(
              'w-4 h-4 rounded-full flex items-center justify-center',
              closeIconBgStr
            )}
          >
            <CloseIcon
              className={closeIconStr}
              style={{
                width: 10,
                height: 10
              }}
            />
          </div>
        )}
      </FlexContainer>
    </div>
  )
}
