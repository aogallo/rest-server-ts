import z from 'zod'

export const userValidator = z.object({
  username: z.string({
    invalid_type_error: 'El usuario debe de ser un string',
    required_error: 'El usuario es requerido',
  }),
  name: z.string({
    invalid_type_error: 'El nombre del usuario debe ser string',
    required_error: 'El nombre del usuario es requerido',
  }),
  password: z
    .string()
    .min(3, 'El password debe de cumplir al menos 3 caracteres'),
  email: z.string().email('El correo no es valido'),
})
