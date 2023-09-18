import { Box, Button, Heading, Text } from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"

export const ProductNotFound = () => {
  const navigate = useNavigate()

  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text">
        400
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Product Not Found
      </Text>
      <Text color={'gray.500'} mb={6}>
        Go back to the list of products and select a new one
      </Text>
      <Button
        onClick={() => navigate('/product/list')}
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant="solid">
        Go to Product List
      </Button>
    </Box>
  )
}