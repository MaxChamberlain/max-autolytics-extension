import FlexContainer from '../Layout/FlexContainer'

type FormProps = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
}

export default function Form({ onSubmit, children }: FormProps) {
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(e)
  }
  return (
    <form onSubmit={submitForm} className='w-full'>
      <FlexContainer direction='column' gap='4' className='w-full'>
        {children}
      </FlexContainer>
    </form>
  )
}
