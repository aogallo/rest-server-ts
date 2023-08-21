import z from 'zod'

export const userValidator = z.object({
  username: z
    .string({
      invalid_type_error: 'El usuario debe de incluir caracteres y números',
      required_error: 'El usuario es requerido',
    })
    .trim()
    .min(3, 'El usuario debe de tener al menos 3 caracteres.'),
  name: z
    .string({
      invalid_type_error: 'El nombre del usuario debe incluir caracteres',
      required_error: 'El nombre del usuario es requerido',
    })
    .trim(),
  password: z
    .string()
    .trim()
    .min(3, 'La contraseña debe de tener al menos 3 caracteres'),
  email: z.string().trim().email('El correo no es valido'),
  roles: z.string().array().min(1),
})
