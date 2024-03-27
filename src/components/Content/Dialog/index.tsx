import { Button } from '../../../components/Form'
import Modal from '../Modal'
import CloseIcon from '@mui/icons-material/Close'
import { AnimatePresence, motion } from 'framer-motion'

type DialogProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode | React.ReactNode[]
  className?: string
  width?: 'uncontrolled' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'screen'
}

export default function Dialog({
  open,
  onClose,
  children,
  width = 'uncontrolled'
}: DialogProps) {
  return (
    <AnimatePresence mode='wait'>
      {open && (
        <motion.div
          key='dialog'
          className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <Modal shadow='lg' onClick={(e) => e.stopPropagation()} width={width} className='relative'>
            {onClose && (
              <Button
                onClick={onClose}
                variant='text'
                className='absolute top-2 right-2 p-1'
                color='static'
              >
                <CloseIcon />
              </Button>
            )}
            {children}
          </Modal>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
