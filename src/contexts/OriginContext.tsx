import { FC, createContext, useEffect, useState } from 'react'
import FlexContainer from '../components/Layout/FlexContainer'
import Modal, { ModalTitle } from '../components/Content/Modal'
import ModalContent from '../components/Content/Modal/ModalContent'

type OriginContextProviderProps = {
  children: React.ReactNode | React.ReactNode[]
}

export const OriginContext = createContext('')

const OriginContextProvider: FC<OriginContextProviderProps> = ({
  children
}) => {
  const [isOnAuthedSite, setIsOnAuthedSite] = useState(false)
  const [origin, setOrigin] = useState('' as string)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    chrome.runtime.sendMessage(
      { action: 'isOnAuthedSite' },
      (response): void => {
        const [isAuthed, origin] = response
        setIsOnAuthedSite(isAuthed)
        setOrigin(origin)
        setLoading(false)
      }
    )
  }, [])

  if (loading) {
    return <p>Please Wait...</p>
  }

  if (isOnAuthedSite) {
    return (
      <OriginContext.Provider value={origin}>{children}</OriginContext.Provider>
    )
  }

  return (
    <FlexContainer
      justify='center'
      align='center'
      className='h-full w-full p-2'
    >
      <Modal width='sm'>
        <ModalTitle>Wrong Page</ModalTitle>
        <ModalContent>
          <p>
            You are not on the correct page to use this extension. Please
            navigate to the correct page to use this extension.
          </p>
        </ModalContent>
      </Modal>
    </FlexContainer>
  )
}

export default OriginContextProvider
