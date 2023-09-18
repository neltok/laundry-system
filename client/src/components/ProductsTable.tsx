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
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react'
import { getProducts } from '../api/getProducts'
import { useNavigate } from 'react-router-dom'

interface Product {
  name: string,
  description: string,
  price: number,
  userId: string,
  _id: string
}

export const ProductsTable = () => {
  const userId = localStorage.getItem('userId')
  const [products, setProducts] = useState<Product[] | undefined>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[] | undefined>([])
  const navigate = useNavigate()

  if (!userId)
    navigate('/login')

  const handleChange = (e: any) => {
    if (e.target.checked) {
      const filtered = products!.filter(p => p.userId === userId)
      setFilteredProducts(filtered)
    }
    else
      setFilteredProducts(products)
  }
  useEffect(() => {
    const get = async () => {
      const response = await getProducts({top: 50})
      console.log(response);
       
      if (response.success) {
        setProducts(response.products)
        setFilteredProducts(response.products)
      }
    }
    get()
  }, [])

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={8}>
      <FormControl display='flex' alignItems='center' paddingLeft='6' paddingBottom='2'>
        <FormLabel mb='0'>
          Only show my products?
        </FormLabel>
        <Switch id='only-my-products' onChange={handleChange} />
      </FormControl>
      <TableContainer>
        <Table variant='striped'>
          <TableCaption>List of all products</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Description</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredProducts!.map((val: Product, index) => {
              const handleClick = () => {
                console.log(val);
                
                navigate('/product/view', { state: val })
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
          <Tfoot>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box >
  )
}