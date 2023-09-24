import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import React, { MouseEventHandler, useState } from "react"
import { FormInput } from "./Inputs/FormInput"
import { useFormik } from "formik"
import * as Yup from "yup"
import { CreateReview } from "../api/CreateReview"
import { Rating } from "../components/RatingPicker"

interface CreateReviewProps {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  updateReviews: () => void,
  initialRef: React.MutableRefObject<null>,
  finalRef: React.MutableRefObject<null>,
  productId: string
}

const validationSchema = Yup.object({
  comment: Yup.string().max(200),
});

export const CreateReviewForm = (props: CreateReviewProps) => {
  const [rating, setRating] = useState(1)
  const [frozen, setFrozen] = useState(false)
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      comment: 'amazing product!',
    },
    validationSchema: validationSchema,
    onSubmit: async (comm, { resetForm }) => {
      const userId = localStorage.getItem('userId') || ''
      const reviewData = {
        comment: comm.comment,
        rating: rating + '',
        userId: userId,
        productId: props.productId
      }
      const newReview = await CreateReview(reviewData)
      console.log(newReview);
      if (!newReview.success) {
        toast({
          title: 'Error.',
          description: newReview.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else if (newReview.success) {
        props.updateReviews()
        props.onClose()
        toast({
          title: 'Success.',
          description: 'New review created',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        resetForm()
      }
    },
  });
  return (
    <>
      <Modal
        initialFocusRef={props.initialRef}
        finalFocusRef={props.finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Give us your opinion!</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormInput
                formik={formik}
                isRequired={false}
                label='Comment'
                name="comment"
                type="text"
                key={1}
              />
              <FormLabel mt={4} mb={4}>Rating</FormLabel>
              <Rating
                setRating={setRating}
                setFrozenParent={setFrozen}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant='outline'
                type="submit"
                colorScheme='blue' mr={3}>
                Save
              </Button>
              <Button onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  )
}