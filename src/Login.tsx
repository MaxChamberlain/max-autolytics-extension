import { useContext } from 'react'
import Modal, { ModalTitle } from './components/Content/Modal'
import Form, { Button, TextField } from './components/Form'
import FlexContainer from './components/Layout/FlexContainer'
import { useLogin } from './hooks/Auth'
import { OriginContext } from './contexts/OriginContext'

export default function Login() {
  const login = useLogin()
  const origin = useContext(OriginContext)
  return (
    <Modal width='sm'>
      <ModalTitle>Sign In</ModalTitle>
      <Form
        onSubmit={() => {
          login(
            // @ts-ignore
            document.getElementById('email')?.value,
            // @ts-ignore
            document.getElementById('password')?.value
          )
        }}
      >
        <FlexContainer direction='column' className='w-full pt-4'>
          <TextField label='Email' type='email' fullWidth id='email' />
          <TextField label='Password' type='password' fullWidth id='password' />
          <Button size='sm' fullWidth className='mt-4'>
            Login
          </Button>
        </FlexContainer>
      </Form>
      {(origin.includes('maxautolytics.com') ||
        origin.includes('localhost')) && (
        <Button
          size='sm'
          fullWidth
          className='mt-4'
          onClick={async () => {
            chrome.runtime.sendMessage(
              {
                action: 'get-credentials'
              },
              (response): void => {
                console.log(response)
                if (response) localStorage.setItem('Authorization', response)
                else localStorage.removeItem('Authorization')
                window.location.reload()
              }
            )
          }}
        >
          Use Max Autolytics credentials
        </Button>
      )}
    </Modal>
  )
}
