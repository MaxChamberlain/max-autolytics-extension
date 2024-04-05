import { useEffect, useState } from 'react'
import FlexContainer from '../components/Layout/FlexContainer'
import { Button } from '../components/Form'
import Modal, { ModalTitle } from '../components/Content/Modal'

export default function GrabSaleButton() {
  const [saleVehicle, setSaleVehicle] = useState<any>(null)
  const [isGrabbing, setIsGrabbing] = useState(false)

  useEffect(() => {
    chrome.storage.local.get('saleVehicle', (data) => {
      if (data.saleVehicle) {
        setSaleVehicle(data.saleVehicle)
      }
    })
  }, [])

  return (
    <FlexContainer direction='column' className='w-full' gap='2'>
      <Modal width='full'>
        <ModalTitle type='subheading' center noUnderline>
          {saleVehicle
            ? `${saleVehicle.ModelYear} ${saleVehicle.Make} ${saleVehicle.Model}`
            : 'No Sale Vehicle Selected'}
        </ModalTitle>
      </Modal>
      <Button
        fullWidth
        size='sm'
        color='static'
        onClick={() => {
          if (isGrabbing) {
            chrome.runtime.sendMessage(
              { action: 'remove-sale-grabbers' },
              () => {
                setIsGrabbing(false)
              }
            )
            return
          }
          chrome.runtime.sendMessage({ action: 'create-sale-grabbers' }, () => {
            setIsGrabbing(true)
            window.close()
          })
        }}
      >
        {isGrabbing ? 'Cancel' : 'Grab a Sale'}
      </Button>
    </FlexContainer>
  )
}
