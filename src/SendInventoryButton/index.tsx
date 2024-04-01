import { useEffect, useState } from 'react'
import FlexContainer from '../components/Layout/FlexContainer'
import { Button } from '../components/Form'
import { CircularProgress, LinearProgress } from '@mui/material'

type ProgressInfo =
  | {
      type: 'text'
      data: {
        text: string
      }
    }
  | {
      type: 'progress'
      data: {
        current: number
        total: number
      }
    }
  | null

export default function SendInventoryButton() {
  const [isSending, setIsSending] = useState(false)
  const [progressInfo, setProgressInfo] = useState<ProgressInfo>(null)

  useEffect(() => {
    chrome.storage.local.get('inventoryTaskId', (data) => {
      if (data.inventoryTaskId) {
        console.log('data', data)
        poll(setIsSending, setProgressInfo, data.inventoryTaskId)
      }
    })
  }, [])

  return (
    <FlexContainer direction='column' className='w-full' gap='2'>
      <Button
        disabled={isSending}
        fullWidth
        size='sm'
        color='static'
        onClick={() => sendInventory(setIsSending, setProgressInfo)}
      >
        Send Inventory to Max Autolytics
      </Button>
      {isSending && progressInfo && progressInfo.type === 'text' && (
        <FlexContainer
          className='w-full'
          gap='2'
          align='center'
          justify='center'
        >
          <CircularProgress size={20} />
          <p>{progressInfo.data.text}</p>
        </FlexContainer>
      )}
      {isSending && progressInfo && progressInfo.type === 'progress' && (
        <FlexContainer
          className='w-full'
          gap='2'
          align='center'
          justify='center'
          direction='column'
        >
          <LinearProgress
            value={100 * (progressInfo.data.current / progressInfo.data.total)}
            style={{
              height: 4,
              width: '100%',
              borderRadius: 4
            }}
            variant='determinate'
          />
          <p>
            {progressInfo.data.current} of {progressInfo.data.total} (
            {Math.round(
              (progressInfo.data.current / progressInfo.data.total) * 100
            )}
            %)
          </p>
        </FlexContainer>
      )}
    </FlexContainer>
  )
}

async function sendInventory(setIsLoading: any, setProgressInfo: any) {
  try {
    setIsLoading(true)
    setProgressInfo({
      type: 'text',
      data: {
        text: 'Gathering inventory...'
      }
    })
    const inventory = await chrome.runtime.sendMessage({
      action: 'get-vauto-inventory'
    })

    fetch('http://localhost:9000/api/v2/webhook/inventory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(inventory.data)
    })
      .then(async (e) => {
        const data = await e.text()
        setProgressInfo({
          type: 'text',
          data: {
            text: 'Got Inventory. Polling for progress...'
          }
        })
        chrome.storage.local.set({ inventoryTaskId: data })
        poll(setIsLoading, setProgressInfo, data)
        return data
      })
      .catch((e) => {
        console.error(e)
        chrome.storage.local.remove('inventoryTaskId')
        setProgressInfo({
          type: 'text',
          data: {
            text: 'There was an error sending inventory.'
          }
        })
      })
  } catch (e) {
    console.error(e)
    chrome.storage.local.remove('inventoryTaskId')
    setProgressInfo({
      type: 'text',
      data: {
        text: 'There was an unexpected error. Please try again.'
      }
    })
  }
}

async function poll(setIsSending: any, setProgressInfo: any, taskId: string) {
  let intervalId: any
  try {
    setIsSending(true)
    intervalId = setInterval(() => {
      fetch('http://localhost:9000/api/v2/webhook/inventory?taskId=' + taskId)
        .then(async (x) => {
          if (!x.ok) {
            console.error('here err')
            clearInterval(intervalId)
            setIsSending(false)
            chrome.storage.local.remove('inventoryTaskId')
            setProgressInfo({
              type: 'text',
              data: {
                text: 'There was an error getting inventory process update.'
              }
            })
            return
          }
          const data = await x.json()
          const { batchCurrent, batchTotal, isCompleted } = data
          if (isCompleted) {
            clearInterval(intervalId)
            chrome.storage.local.remove('inventoryTaskId')
            setProgressInfo({
              type: 'text',
              data: {
                text: 'Finished sending inventory.'
              }
            })
            return
          }
          setProgressInfo({
            type: 'progress',
            data: {
              current: batchCurrent,
              total: batchTotal
            }
          })
        })
        .catch((e) => {
          console.error(e)
          clearInterval(intervalId)
          setIsSending(false)
          chrome.storage.local.remove('inventoryTaskId')
          setProgressInfo({
            type: 'text',
            data: {
              text: 'There was an error getting inventory process update.'
            }
          })
        })
    }, 1000)
  } catch (e) {
    console.error(e)
    clearInterval(intervalId)
    setIsSending(false)
    chrome.storage.local.remove('inventoryTaskId')
    setProgressInfo({
      type: 'text',
      data: {
        text: 'There was an error getting inventory process update.'
      }
    })
  }
}
