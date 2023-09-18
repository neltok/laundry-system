import { Flex, FlexProps, Icon, Link, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { NavigateFunction } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  AlertDialogProps,
} from '@chakra-ui/react'
interface NavItemProps extends FlexProps {
  icon: IconType;
  children: string;
  routeTo?: string,
  navFunc?: NavigateFunction
  styles: Object
}

export default function RouteButton({ icon, children, routeTo, navFunc, styles, ...rest }: NavItemProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef(null)

  return (
    <>
      <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}
      onClick={() => {
        onOpen()
        // onClose()
        // if (children !== 'Log out')
        if(routeTo && navFunc)
          navFunc(routeTo)
        //   localStorage.clear()
      }
      }
      >
        <Flex
          {...styles}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
      {/* <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog> */}
    </>
  );
};
