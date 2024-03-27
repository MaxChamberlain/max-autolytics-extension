import Modal, { ModalTitle } from './components/Content/Modal'
import Form, { Button, TextField } from './components/Form'
import FlexContainer from './components/Layout/FlexContainer'
import { useLogin } from './hooks/Auth'


export default function Login() {
  const login = useLogin()
  return (
        <Modal width='sm'>
          <ModalTitle>Sign In</ModalTitle>
          <Form onSubmit={() => {
            // @ts-ignore
            login(document.getElementById('email')?.value, document.getElementById('password')?.value)
          }}>
            <FlexContainer direction='column' className='w-full pt-4'>
              <TextField label='Email' type='email' fullWidth id='email' />
              <TextField label='Password' type='password' fullWidth id='password' />
              <Button size='sm' fullWidth className='mt-4'>Login</Button>
            </FlexContainer>
          </Form>
        </Modal>
    )
}