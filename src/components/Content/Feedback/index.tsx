import { twMerge } from 'tailwind-merge'
import InfoIcon from '@mui/icons-material/Info'
import ErrorIcon from '@mui/icons-material/Error'
import WarningIcon from '@mui/icons-material/Warning'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FlexContainer from '../../../components/Layout/FlexContainer'

type FeedbackProps = {
  message?: string
  severity: 'error' | 'warning' | 'info' | 'success'
  onClose: () => void
  open?: boolean
  title?: string
  fullWidth?: boolean
}

export default function Feedback({
  message,
  severity,
  onClose,
  open,
  title,
  fullWidth
}: FeedbackProps) {
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

  const icon =
    severity === 'error' ? (
      <ErrorIcon />
    ) : severity === 'warning' ? (
      <WarningIcon />
    ) : severity === 'info' ? (
      <InfoIcon />
    ) : (
      <CheckCircleIcon />
    )
  if (!open) return null
  return (
    <div
      className={twMerge(
        'p-2 rounded-md border cursor-pointer w-fit text-center',
        backgroundStr,
        borderStr,
        textStr,
        'flex justify-center items-center',
        fullWidth && 'w-full'
      )}
      onClick={onClose}
    >
      <FlexContainer gap='2' align='center' direction='column'>
        <Title icon={icon} title={title} />
        {message && (
          <span className='text-center max-h-[6rem] overflow-x-auto'>
            {message}
          </span>
        )}
      </FlexContainer>
    </div>
  )
}

function Title({ icon, title }: { icon: React.ReactNode; title?: string }) {
  return (
    <FlexContainer gap='2' align='center' justify='start' className='w-full'>
      {icon}
      {title && <h3 className='text-lg font-semibold'>{title}</h3>}
    </FlexContainer>
  )
}
