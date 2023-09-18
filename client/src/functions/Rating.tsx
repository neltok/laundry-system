import React from "react";
import { Box, Tooltip } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";

interface RatingProps {
  rating: number;
  numReviews: number;
}

export function Rating({ rating, numReviews}: RatingProps) {
  return (
    <Box alignItems="center" className='hola' display={'flex'}>
      {Array(5)
        .fill('')
        .map((_, i) => {
          const roundedRating = Math.round(rating * 2) / 2;
          if (roundedRating - i >= 1) {
            return (
              <BsStarFill
                key={i}
                color={i < rating ? 'teal.500' : 'gray.300'}
              />
            );
          }
          if (roundedRating - i === 0.5) {
            return <BsStarHalf key={i} />;
          }
          return <BsStar key={i} />;
        })}
      <Tooltip
        label="See all"
        bg="white"
        placement={'top'}
        color={'gray.800'}
        fontSize={'1.2em'}
      >
        <Box as="button" ml="2" mt='1' color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && 's'}
        </Box>
      </Tooltip>
    </Box>
  );
}