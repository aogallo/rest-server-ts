import z from 'zod'

export const userValidator = z.object({
  username: z
    .string({
      invalid_type_error: 'El usuario debe de ser un string',
      required_error: 'El usuario es requerido',
    })
    .trim(),
  name: z
    .string({
      invalid_type_error: 'El nombre del usuario debe ser string',
      required_error: 'El nombre del usuario es requerido',
    })
    .trim(),
  password: z
    .string()
    .trim()
    .min(3, 'El password debe de cumplir al menos 3 caracteres'),
  email: z.string().trim().email('El correo no es valido'),
  roles: z.string().array().min(1),
})
