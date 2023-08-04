import { z } from 'zod'

export const roleValidator = z
  .object({
    name: z
      .string({
        invalid_type_error: 'El nombre debe ser string',
        required_error: 'El nombre es requerido',
      })
      .trim()
      .min(3, 'El nombre del ROL debe tener al menos 3 caracteres'),
    permissions: z.array(z.string()).min(1),
  })
  .passthrough()
