import Login from './Login'
import Header from './components/Header'
import FlexContainer from './components/Layout/FlexContainer'
import { UserContextProvider } from './contexts/UserContext'

function App() {
  const isAuthed = Boolean(localStorage.getItem('Authorization'))
  return (
    <UserContextProvider>
      <div className='w-full h-full'>
        <Header />
        <main className="p-0 bg-background-primary h-[calc(600px_-_48px)] overflow-y-auto">
          <FlexContainer justify='center' align='center' className='h-full w-full p-2'>
            {!isAuthed && <Login />}
          </FlexContainer>
        </main>
      </div>
    </UserContextProvider>
  )
}
export default App