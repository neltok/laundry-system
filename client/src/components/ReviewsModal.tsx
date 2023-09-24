import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import React, { MouseEventHandler, useState } from "react"
import { FormInput } from "./Inputs/FormInput"
import { useFormik } from "formik"
import * as Yup from "yup"
import { CreateReview } from "../api/CreateReview"
import { Rating } from "./RatingPicker"
import { TestimonialCard } from "./Testimonials"

interface ReviewsModalProps {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void,
  initialRef: React.MutableRefObject<null>,
  finalRef: React.MutableRefObject<null>,
  productId: string
}

export const ReviewsModal = (props: ReviewsModalProps) => {
  return (
    <>
      <Modal
        initialFocusRef={props.initialRef}
        finalFocusRef={props.finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
      >
        <ModalOverlay />
          <ModalContent>
            <ModalHeader>Reviews </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <TestimonialCard
              heading="review"
              text="hello"
              />
            </ModalBody>
            <ModalFooter>
              <Button onClick={props.onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
      </Modal>
    </>
  )
}