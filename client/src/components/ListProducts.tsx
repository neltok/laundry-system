import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import { getProducts } from '../api/getProducts'

interface Product {
  name: string,
  description: string,
  price: number,
  userId: string,
  _id: string
}

export const ListProducts = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const get = async () => {
      const products = await getProducts()
      if (products.success)
        setProducts(products.products)
    }
    get()
  }, [])

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}>

      <TableContainer>
        <Table variant='simple'>
          <TableCaption>List of all products</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((val, index) => {
              const handleClick = () => {
                console.log(val._id);
              }
              return (
                <Tr key={val._id} role='button' onClick={handleClick}>
                  <Td>{val.name}</Td>
                  <Td>{val.description}</Td>
                  <Td isNumeric>$ {val.price}</Td>
                </Tr>
              )
            })}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </Box >
  )
}