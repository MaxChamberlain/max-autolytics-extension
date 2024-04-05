import { useEffect, useState } from 'react'
import FlexContainer from '../components/Layout/FlexContainer'
import { Button } from '../components/Form'

export default function PutSaleButton() {
  const [saleVehicle, setSaleVehicle] = useState<any>(null)

  useEffect(() => {
    chrome.storage.local.get('saleVehicle', (data) => {
      console.log('data', data)
      if (data.saleVehicle) {
        setSaleVehicle(data.saleVehicle)
      }
    })
  }, [])

  return (
    <FlexContainer direction='column' className='w-full' gap='2'>
      <Button
        fullWidth
        size='sm'
        color='static'
        disabled={!saleVehicle}
        onClick={() => {
          chrome.runtime.sendMessage({ action: 'put-sale-vehicle' })
          window.close()
        }}
      >
        Put Sale
      </Button>
    </FlexContainer>
  )
}
