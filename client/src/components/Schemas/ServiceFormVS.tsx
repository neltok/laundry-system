import * as Yup from "yup";

const ServiceFormVS = Yup.object({
  name: Yup.string().max(50).required("Name is required"),
  description: Yup.string().max(50).required("Description is required"),
  image: Yup.string()
    .matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      'Enter correct url!'
    )
    .required('Please enter website'),
  price: Yup.number().min(1).required("Price is required"),
});


export default ServiceFormVS