import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
  AlertDialogProps,
  Flex,
} from '@chakra-ui/react'
import React from 'react'
import { IconType } from 'react-icons/lib';
import { NavigateFunction } from 'react-router-dom';
import { FiHome, FiEdit, FiEdit2, FiBookOpen, FiLogOut, FiMenu, } from 'react-icons/fi';
import { BsBodyText } from 'react-icons/bs';

interface ButtonProps {
  icon: IconType;
  children: string;
  navFunc?: NavigateFunction
  onClose?: () => void,
  styles: any
  alertBodyTxt: String
  alertHdrTxt: String
  alertActionTxt: String
  buttonTxt: String
}

export default function AlertDialogButton({ styles, icon, buttonTxt, alertHdrTxt, alertBodyTxt, alertActionTxt, ...rest }: ButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)

  return (
    <>
      <Flex
        {...styles}
        {...rest}>
        {/* {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )} */}
        <Button
        leftIcon={<FiLogOut/>}
          colorScheme='red' onClick={onOpen}>
          {buttonTxt}
        </Button>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {alertHdrTxt}
            </AlertDialogHeader>

            <AlertDialogBody>
             {alertBodyTxt}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                {alertActionTxt}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}