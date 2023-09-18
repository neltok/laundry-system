import React, { useState } from "react";
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

import { useFormik } from "formik";
import * as Yup from "yup";
import { FormInput } from "./FormInput";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { CreateProduct } from "../api/CreateProduct";

const validationSchema = Yup.object({
  name: Yup.string().max(50).required("Name is required"),
  description: Yup.string().max(50).required("Description is required"),
  image: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    )
    .required('Please enter website'),
  price: Yup.number().min(1).required("Price is required"),
});

export default function CreateProductForm() {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      name: "Lentes",
      description: "Unos lentes bien padres",
      price: '',
      image: "https://opticaexpress.hn/wp-content/uploads/2021/06/RAY-BAN-3RO01804.png",
    },
    validationSchema: validationSchema,
    onSubmit: async (formData, {resetForm}) => {
      const userId = localStorage.getItem('userId') || ''
      const productData ={
        ...formData,
        userId: userId
      }
      const newProduct = await CreateProduct(productData)
      if (!newProduct.success) {
        toast({
          title: 'Error.',
          description: newProduct.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else if (newProduct.success) {
        toast({
          title: 'Success.',
          description: 'New product created',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        resetForm()
      }
    },
  });

  return (
    <Flex
      // minH={'100vh'}
      align={'center'}
      justify={'center'}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            &nbsp;&nbsp;Create a new product&nbsp;&nbsp;
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
                label="Description"
                name="description"
                type="text"
              />
              <FormInput
                formik={formik}
                isRequired={true}
                label="Price"
                name="price"
                type="text"
              />
              <FormInput
                formik={formik}
                isRequired={true}
                label="Image"
                name="image"
                type="text"
              />
              <Stack spacing={10} pt={2}>
                <Button
                  variant='outline'
                  type="submit"
                  loadingText="Submitting"
                  size="md"
                  colorScheme="teal"
                >
                  Create
                </Button>
              </Stack>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}
