import FlexContainer from '../components/Layout/FlexContainer'
import { Button } from '../components/Form'

export default function FilterNoSourceButton() {
  return (
    <FlexContainer direction='column' className='w-full' gap='2'>
      <Button
        fullWidth
        size='sm'
        color='static'
        onClick={() => {
          chrome.runtime.sendMessage({ action: 'filter-no-source' })
        }}
      >
        Remove Inventory With Source
      </Button>
    </FlexContainer>
  )
}
