import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
  useColorModeValue,
  Icon,
} from '@chakra-ui/react';
import { FiEdit } from 'react-icons/fi';
import { IconType } from 'react-icons';

const Testimonial = ({ children }: { children: React.ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      boxShadow={'lg'}
      p={8}
      rounded={'xl'}
      align={'center'}
      pos={'relative'}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: 'solid transparent',
        borderLeftWidth: 16,
        borderRight: 'solid transparent',
        borderRightWidth: 16,
        borderTop: 'solid',
        borderTopWidth: 16,
        borderTopColor: useColorModeValue('white', 'gray.800'),
        pos: 'absolute',
        bottom: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading as={'h3'} fontSize={'xl'}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: React.ReactNode }) => {
  return (
    <Text
      textAlign={'center'}
      color={useColorModeValue('gray.600', 'gray.400')}
      fontSize={'sm'}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={'center'} mt={8} direction={'column'}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={'center'}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={'sm'} color={useColorModeValue('gray.600', 'gray.400')}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

interface Review {
  comment: string,
  rating: string,
  userName?: string,
  userEmail?: string
}
interface ReviewsProps {
  reviewsArr?: Review[],
}

interface TestimonialCardProps {
  heading: string
  text: string
  icon?: IconType
}

export const TestimonialCard = (props: TestimonialCardProps) => {
  return (
    <Testimonial>
      <TestimonialContent>
        <TestimonialHeading>{props.heading}</TestimonialHeading>
        <TestimonialText>
          {props.text}
        </TestimonialText>
      </TestimonialContent>
      <Flex align={'center'} mt={8} direction={'column'}>
        <Stack align={'center'}>
          {props.icon && <Icon as={props.icon} h={7} w={7} alignSelf={'center'} />}
        </Stack>
      </Flex>
    </Testimonial>
  )
}

export default function Testimonials(reviews: ReviewsProps) {

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.700')}>
      <Container maxW={'7xl'} as={Stack} spacing={12}>
        <Stack spacing={0} align={'center'}>
          <Heading>Our Clients Speak</Heading>
          <Text>Latest reviews by our customers.</Text>
        </Stack>
        <Stack
          // direction={{ base: 'column', md: 'row' }}
          display={reviews.reviewsArr?.length === 0 ? 'block' : 'flex'}
          spacing={{ base: 10, md: 4, lg: 10 }}>
          {reviews.reviewsArr!.map((v, i) => {
            return (
              <Testimonial key={i}>
                <TestimonialContent>
                  <TestimonialHeading>Rating: {v.rating}</TestimonialHeading>
                  <TestimonialText>
                    {v.comment}
                  </TestimonialText>
                </TestimonialContent>
                <TestimonialAvatar
                  src={
                    'https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80'
                  }
                  name={v.userName || ''}
                  title={v.userEmail || ''}
                />
              </Testimonial>
            )
          })}
          {reviews.reviewsArr?.length === 0 && <TestimonialCard
            heading='No reviews yet!'
            text='Create the first review by clicking the Create Review Icon.'
            icon={FiEdit}
          />}
        </Stack>
      </Container>
    </Box>
  );
}