import * as Yup from 'yup'


const registrationSchema = Yup.object().shape({
    nome: Yup.string()
      .required('O nome  é obrigatório'),

    email: Yup.string()
      .required('O Email é obrigatório'),

    cargo: Yup.string()
      .required('O Cargo é obrigatório'),

  })
  export default registrationSchema;
