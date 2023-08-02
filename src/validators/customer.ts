import { z } from 'zod'

export const createCustomerValidator = z
  .object({
    name: z.string().min(3, 'El nombre debe contener al menos 3 caracteres'),
    email: z.string().email({ message: 'El correo no es válido' }),
    address: z.string().optional(),
    phone: z.string().optional(),
  })
  .passthrough()

export const updateCustomerValidator = z
  .object({
    name: z
      .string()
      .min(3, 'El nombre debe contener al menos 3 caracteres')
      .optional(),
    email: z.string().email({ message: 'El correo no es válido' }).optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
  })
  .passthrough()
