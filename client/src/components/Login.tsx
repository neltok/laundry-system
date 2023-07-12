import React from 'react';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { FormInput } from './FormInput';
import { useFormik } from 'formik';
import { Login } from '../api/Login'

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
})

export default function LoginComponent() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (userData) => {
      const exist = await Login(userData)

      if(exist.success){
        localStorage.setItem('userId', exist.userId)
        navigate('/')
      }
    }
  })

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormInput
                formik={formik}
                isRequired={true}
                label="Email"
                name="email"
                type="email"
              />
              <FormInput
                formik={formik}
                isRequired={true}
                label="Password"
                name="password"
                type="password"
              />
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Login
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Not a user? <Link color={'blue.400'} onClick={() => navigate('/signup')}>Sign Up</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}