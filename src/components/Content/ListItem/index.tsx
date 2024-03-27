import FlexContainer from '../../../components/Layout/FlexContainer'
import { Skeleton } from '@mui/material'
import { ModalTitle } from '../Modal'
import { twMerge } from 'tailwind-merge'

type ListItemProps = {
  color?: string
  text: string
  icon?: React.ReactNode
  loading?: boolean
  metric?: string | number
  metrics?: (string | number)[]
  size: 'sm' | 'md'
}

export default function ListItem({
  color = 'var(--primary)',
  text,
  icon,
  loading,
  metric,
  metrics,
  size = 'md'
}: ListItemProps) {
  return (
    <FlexContainer
      align='center'
      gap='2'
      justify='between'
      className={twMerge(
        'whitespace-nowrap w-full p-0',
        size === 'sm' ? 'text-sm font-normal' : 'text-base font-semibold'
      )}
    >
      <FlexContainer align='center' gap='2' className='w-full p-0'>
        {Boolean(icon) ? (
          <div className='h-full aspect-square'>{icon}</div>
        ) : (
          <div
            className='h-6 w-1 rounded-full'
            style={{
              backgroundColor: color
            }}
          ></div>
        )}
        {loading ? (
          <Skeleton variant='text' width={'100%'} style={{ minWidth: 50 }} />
        ) : (
          <span>{text}</span>
        )}
      </FlexContainer>
      {metric !== null && metric !== undefined && (
        <ModalTitle
          type='subheading'
          noUnderline
          containerClassname='w-fit p-0'
        >
          {loading ? (
            <Skeleton variant='text' width={50} />
          ) : (
            <span className='font-semibold'>{metric}</span>
          )}
        </ModalTitle>
      )}
      {metrics && (
        <ModalTitle
          type='subheading'
          noUnderline
          containerClassname='w-fit p-0'
        >
          {loading ? (
            <Skeleton variant='text' width={50} />
          ) : (
            <FlexContainer align='end' direction='column' gap='0'>
              {metrics?.map((item, index) => (
                <FlexContainer align='center' gap='2' key={`${item}-${index}`}>
                  <span className='font-semibold'>{item}</span>
                  <div
                    className={`p-1 rounded-full ${
                      index === 0 ? 'bg-primary' : 'bg-secondary'
                    }`}
                  ></div>
                </FlexContainer>
              ))}
            </FlexContainer>
          )}
        </ModalTitle>
      )}
    </FlexContainer>
  )
}
