import { z } from "zod";

export const createPasswordShema = z.object({
  newPassword: z.string().min(5, "At least 5 characters"),
});

export type createPasswordForm = z.infer<typeof createPasswordShema>;