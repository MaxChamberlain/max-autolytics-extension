import { useContext, useEffect, useState } from 'react'
import FlexContainer from './Layout/FlexContainer'
import { UserContext } from '../contexts/UserContext'
import { properText } from '../lib/textUtility'

export default function Header() {
  const { user } = useContext(UserContext)
  const [headerContent, setHeaderContent] = useState<string>('')
  useEffect(() => {
    chrome.runtime.sendMessage(
      {
        action: 'get-vauto-store'
      },
      (response): void => {
        console.log(response)
        if (response) setHeaderContent(`${response?.split(' - ')[0]}`)
        else setHeaderContent('Hello, ' + properText(user?.FirstName))
      }
    )
  }, [user])
  return (
    <header className='p-2 bg-background-secondary flex gap-4 h-12'>
      <FlexContainer>
        <img src='/logo.svg' className='h-8 w-8 invert' alt='logo' />
        <h1 className='text-lg'>{headerContent}</h1>
      </FlexContainer>
    </header>
  )
}
