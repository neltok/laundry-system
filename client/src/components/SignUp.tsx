import React from "react";
import {
  Flex,
  Box,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { Register } from "../api/Register";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormInput } from "./FormInput";
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function SignUp() {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (userData) => {
      const register = await Register(userData)
      if(register.success){
        localStorage.setItem('userId', register.data.newUserId)
        navigate('/')
      }
    },
  });

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up your new account
          </Heading>
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
                label="Name"
                name="name"
                type="text"
              />
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
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} onClick={() => navigate('/login')}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
