import { z } from "zod";

export const titleSchema = z.object({
  title: z.string().min(3, { message: 'Minimum of 3 characters is required'})
})

export type TitleFormType = z.infer<typeof titleSchema>