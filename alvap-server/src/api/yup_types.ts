import * as yup from 'yup';

export const correo = yup
  .string()
  .email('Inserta un correo electrónico válido')
  .required('Inserta un correo electrónico');

export const password = yup
  .string()
  .min(8, 'La contraseña debe de tener por lo menos 8 caracteres')
  .required('Inserta una contraseña');

export const celular = yup
  .string()
  .required('Inserta un celular')
  .matches(/^\(?(\s*\d){3}\)?(-*\s*\d){7}$/, 'Inserta un celular válido');

export const nombre = yup.string().required('Inserta un nombre');

export const domicilio = yup.string().required('Inserta un domicilio');

export const loginSchema = yup.object().shape({
  correo,
  password: yup.string().required('Inserta una contraseña'),
});
