import React, { useEffect, useState } from 'react';
import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
  Heading,
  Button,
  useDisclosure
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { FiEdit } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreateReviewForm } from './CreateReviewForm';
import { ProductNotFound } from './ProductNotFound';
import Testimonials from './Testimonials'
import { Rating } from '../functions/Rating';
import { getReviews } from '../api/getReviews';
import { Product as ProductI } from '../interfaces/Product';
import { Review } from '../interfaces/Review';
import { ReviewsModal } from './ReviewsModal';
import { addUsersToReviews } from '../functions/addUsersToReviews';
import { getUsersData } from './ReviewTable';
import { getProducts } from '../api/getProducts';
import { getReviewsCount } from '../api/getReviewsCount';

function Product() {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const location = useLocation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [createReview, setCreateReview] = useState(false)
  const [reviews, setReviews] = useState<Review[] | undefined>([])
  const [product, setProduct] = useState<ProductI | any>(location.state)

  const getReviewsHook = async () => {
    const localProd: ProductI[] | undefined = (await getProducts({ top: 1, productIds: [product._id!] })).products

    const response = await getReviews({ productId: product._id, top: 3 })
    const usersData = await getUsersData(response.reviews)
    const reviewsAndUsers = addUsersToReviews(response.reviews, usersData)

    setProduct(localProd![0])
    setReviews(reviewsAndUsers)
  }

  const getReviewsCountHook = async () => {
    const reviewsCount = await getReviewsCount({ productId: product._id })
    console.log(reviewsCount);
  }


  useEffect(() => {

    (async () => {
      if (product) {
        await getReviewsHook()
        await getReviewsCountHook()
      }
    })()
  }, [])

  if (!product) {
    return (
      <ProductNotFound />
    )
  }

  return (
    <Box >
      <Flex p={50} w="full" alignItems="center" justifyContent="center" >
        <Box
          alignSelf='baseline'
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">
          <CreateReviewForm
            updateReviews={getReviewsHook}
            productId={product._id!}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            initialRef={initialRef}
            finalRef={finalRef} />
          <Circle
            size="10px"
            position="absolute"
            top={2}
            right={2}
            bg="red.200"
          />
          <Image
            mt={5}
            src={product.image}
            alt={`Picture of ${product.name}`}
            roundedTop="lg"
            height='153px'
            width='400px'
            objectFit='contain'
          />
          <Box p="6">
            <Box alignItems="baseline">
              {(
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                  New
                </Badge>
              )}
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated>
                {product.name}
              </Box>
              <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                <Box as="span" color={'gray.600'} fontSize="lg">
                  $&nbsp;
                </Box>
                {product.price}
              </Box>
            </Flex>
            <Flex>
              <Text color={'gray.500'} m='1' align={'justify'}>
                {product.description}
              </Text>
            </Flex>
            <Flex justifyContent="space-between" alignContent="center">
              <Rating
                rating={product.rating || 0} numReviews={product.reviewsCount || 0} />
              <Tooltip
                label="Add Review"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}>
                <chakra.a
                  onClick={() => {
                    setCreateReview(true)
                    onOpen()
                  }}
                  as='button' display={'flex'}>
                  <Icon as={FiEdit} h={7} w={7} alignSelf={'center'} />
                </chakra.a>
              </Tooltip>
            </Flex>
          </Box>
        </Box>
      </Flex>
      <Flex paddingTop={1} w="full" alignItems="center" justifyContent="center">
        <Testimonials reviewsArr={reviews} />
      </Flex>
    </Box>
  );
}

export default Product;