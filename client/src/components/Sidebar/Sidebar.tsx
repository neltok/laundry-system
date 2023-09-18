import React, { ReactComponentElement, ReactNode } from 'react';
import { IconButton, Box, CloseButton, Flex, Icon, useColorModeValue, Link, Drawer, DrawerContent, Text, useDisclosure, BoxProps, FlexProps, HStack, VStack, Spacer, } from '@chakra-ui/react';
import { FiHome, FiEdit, FiEdit2, FiBookOpen, FiLogOut, FiMenu, } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { Navigate, NavigateFunction, Route, useNavigate } from 'react-router-dom';
import AlertDialogButton from '../Buttons/AlertDialogButton'
import RouteButton from '../Buttons/RouteButton';

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string,
  component?: () => void
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiHome, route: '/' },
  { name: 'Product Create ', icon: FiEdit, route: '/product/create' },
  { name: 'Product List', icon: FiBookOpen, route: '/product/list' },
  { name: 'Review List', icon: FiBookOpen, route: '/review/list' },
  // { name: 'Log out', icon: FiLogOut, route: '/login' },
];


export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      {/* content */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const sidebarCssBtn = {
  align: "center",
  p: "4",
  mx: "4",
  borderRadius: "lg",
  role: "group",
  cursor: "pointer",
  _hover: {
    bg: 'cyan.400',
    color: 'white',
  }
}

const sidebarCssLogoutBtn = {
  align: "center",
  p: "4",
  mx: "4",
  borderRadius: "lg",
  role: "group",
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate()

  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          3Nets
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <VStack
        align={"stretch"}
      >

        {LinkItems.map((link) => (
          <RouteButton key={link.name} navFunc={navigate} routeTo={link.route} children={link.name} icon={link.icon} styles={sidebarCssBtn} />
        ))}
        <AlertDialogButton alertActionTxt={"Logout"} alertBodyTxt={"Are you sure you want to logout?"} icon={FiLogOut} children='Logout' styles={sidebarCssLogoutBtn} alertHdrTxt={"Logout"} buttonTxt={"Logout"} />
      </VStack>
    </Box>
  );
};


interface MobileProps extends FlexProps {
  onOpen: () => void;
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};