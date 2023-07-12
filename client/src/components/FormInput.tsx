import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';

interface FormInputProps {
  formik: any,
  name: string,
  isRequired: boolean,
  label: string,
  type: string,
}

export const FormInput = (props: FormInputProps) => {
  const { formik, name, isRequired, label, type } = props

  return (
    <FormControl id={name} isRequired={isRequired} isInvalid={!!formik.errors[name] && formik.touched[name]}>
      <FormLabel>{label}</FormLabel>
      <Input
        autoComplete='true'
        type={type}
        {...formik.getFieldProps({ name })}
      />
      <FormErrorMessage>{formik.errors[name]}</FormErrorMessage>
    </FormControl>
  );
};