import {z} from 'zod'

export const CvDetailsShema = z.object({
  name: z.string().min(1, 'Required field'),
  education: z.string(),
  description: z.string().min(1, 'Required field'),
})

export type createCvDetailsForm = z.infer<typeof CvDetailsShema>
