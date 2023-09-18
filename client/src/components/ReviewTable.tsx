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
  FormControl,
  FormLabel,
  Switch,
} from '@chakra-ui/react'
import { getReviews } from '../api/getReviews'
import { useNavigate } from 'react-router-dom'
import { Review } from '../interfaces/Review'
import { User } from '../interfaces/User'
import { getUsers } from '../api/getUsers'
import { getProducts } from '../api/getProducts'
import { GetProductProps } from '../interfaces/GetProductProps'
import { Product } from '../interfaces/Product'
import { addUsersToReviews } from '../functions/addUsersToReviews'
import { addProductsToReviews } from '../functions/addProductsToReview'

export const getUsersData = async (reviews: Review[] | undefined): Promise<User[] | undefined> => {
  const getUsersProps = {
    usersIds: reviews!.map((e: Review) => e.userId).filter((element, index, arr) => {
      return arr.indexOf(element) === index;
    }),
    top: 50
  }
  return (await getUsers(getUsersProps)).users
}

export const getProductsData = async (reviews: Review[] | undefined): Promise<Product[] | undefined> => {
  const getProductsProps:GetProductProps = {
    productIds: reviews!.map((e: Review) => e.productId).filter((element, index, arr) => {
      return arr.indexOf(element) === index;
    }),
    top: 50
  }
  return (await getProducts(getProductsProps)).products
}

export const ReviewTable = () => {
  const userId = localStorage.getItem('userId')
  const [reviews, setReviews] = useState<Review[] | undefined>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[] | undefined>([])
  const navigate = useNavigate()

  if (!userId)
    navigate('/login')

  const handleChange = (e: any) => {
    if (e.target.checked) {
      const filtered = reviews!.filter(p => p.userId === userId)
      setFilteredReviews(filtered)
    }
    else
      setFilteredReviews(reviews)
  }

  useEffect(() => {
    const get = async () => {
      const response = await getReviews({ top: 50 })
      if (response.success) {
        const usersData = await getUsersData(response.reviews)
        const reviewsAndUsers = addUsersToReviews(response.reviews, usersData)
        const productsData = await getProductsData(response.reviews)
        const completeReviews =  addProductsToReviews(reviewsAndUsers, productsData) 
        setReviews(completeReviews)
        setFilteredReviews(completeReviews)
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
          Only show reviews created by me?
        </FormLabel>
        <Switch id='only-my-products' onChange={handleChange} />
      </FormControl>
      <TableContainer>
        <Table variant='striped'>
          <TableCaption>List of all reviews</TableCaption>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>By</Th>
              <Th>Comment</Th>
              <Th>Rating</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredReviews!.map((val: Review, index) => {
              return (
                <Tr key={val._id} role='button' onClick={() => console.log(val)}>
                  <Td>{val.productName}</Td>
                  <Td>{val.userName}</Td>
                  <Td>{val.comment}</Td>
                  <Td isNumeric> {val.rating}</Td>
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