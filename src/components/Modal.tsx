import { 
  Modal as ChakraModal,
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton,
  ModalProps as ChakraModalProps,
} from "@chakra-ui/react"
import { ReactNode } from "react"

type ModalProps = ChakraModalProps & {
  title: string
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({title, isOpen, onClose, children, ...rest}: ModalProps) {
  return (
    <ChakraModal 
      size="xs" 
      onClose={onClose}
      isOpen={isOpen}
      {...rest} 
    >
      <ModalOverlay />
      <ModalContent bg="backgroundForeground">
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        { children }
      </ModalContent>
    </ChakraModal>
  )
}