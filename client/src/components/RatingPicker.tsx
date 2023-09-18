import { Box } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import React, { useState } from "react"

interface RatingProps {
  setRating: (arg0: number) => void;
  setFrozenParent: (arg0: boolean) => void;
}

export function Rating({ setRating, setFrozenParent }: RatingProps) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [frozen, setFrozen] = useState(false);

  const handleHover = (index: any) => {
    if (!frozen) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (!frozen) {
      setHoveredIndex(null);
    }
  };

  const handleClick = (index: number) => {
    const thisFrozen = !frozen
    setFrozen(thisFrozen);
    setFrozenParent(thisFrozen)
    setRating(index + 1);
  };

  return (
    <Box alignItems="center" display={'flex'} justifyContent={'space-evenly'}>
      {[0, 1, 2, 3, 4].map((index) => (
        <span
          role="button"
          key={index}
          onMouseOver={() => handleHover(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(index)}
        >
          {index <= hoveredIndex! ? <BsStarFill /> : <BsStar />}
        </span>
      ))}
    </Box>
  );
}