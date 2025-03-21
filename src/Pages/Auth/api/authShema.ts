import {z} from 'zod'

export const createAuthShema = z.object({
  email: z
    .string()
    .regex(
      /^([A-Za-z0-9_\-.-])+@([A-Za-z0-9_\-.-])+\.([A-Za-z]{2,4})$/,
      'Incorrect email'
    ),
  password: z.string().min(5, 'At least 5 characters'),
})

export type createAuthForm = z.infer<typeof createAuthShema>
