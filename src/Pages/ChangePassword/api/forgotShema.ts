import {z} from 'zod'

export const createForgotShema = z.object({
  email: z.string().min(1),
})

export type createForgotForm = z.infer<typeof createForgotShema>
