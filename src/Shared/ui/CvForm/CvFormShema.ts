import {z} from 'zod'

export const CvShema = z.object({
  name: z.string().min(1, 'Required field'),
  education: z.string(),
  description: z.string().min(1, 'Required field'),
})

export type CvFormType = z.infer<typeof CvShema>
