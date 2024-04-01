import Login from './Login'
import Header from './components/Header'
import FlexContainer from './components/Layout/FlexContainer'
import { UserContextProvider } from './contexts/UserContext'
import OriginContextProvider from './contexts/OriginContext'
import SendInventoryButton from './SendInventoryButton'
import GrabSaleButton from './GrabSaleButton'
import PutSaleButton from './PutSaleButton'

function App() {
  const isAuthed = Boolean(localStorage.getItem('Authorization'))

  return (
    <UserContextProvider>
      <div className='w-full h-full'>
        <Header />
        <main className='p-0 bg-background-primary h-[calc(600px_-_48px)] overflow-y-auto'>
          <OriginContextProvider>
            {!isAuthed ? (
              <FlexContainer
                justify='center'
                align='center'
                className='h-full w-full p-2'
              >
                <Login />
              </FlexContainer>
            ) : (
              <FlexContainer
                className='h-full w-full p-2'
                direction='column'
                align='center'
                gap='8'
              >
                <GrabSaleButton />
                <PutSaleButton />
                <SendInventoryButton />
              </FlexContainer>
            )}
          </OriginContextProvider>
        </main>
      </div>
    </UserContextProvider>
  )
}
export default App
