import FlexContainer from '../../../components/Layout/FlexContainer'
import { Divider } from '@mui/material'

type ModalContsxtProps = {
  description?: string
  icon?: React.ReactNode
  children?: React.ReactNode | React.ReactNode[]
}

export default function ModalContext({
  description,
  icon,
  children
}: ModalContsxtProps) {
  return (
    <div className='pt-4 w-full'>
      {children ?? (
        <FlexContainer align='center' gap='4' className='px-4'>
          {icon}
          <p className='pl-4'>{description}</p>
        </FlexContainer>
      )}
      <Divider style={{ width: '100%', marginTop: 16 }} />
    </div>
  )
}
